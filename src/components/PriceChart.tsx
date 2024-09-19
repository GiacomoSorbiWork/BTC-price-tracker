import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createChart, IChartApi, ISeriesApi, LineData, Time } from 'lightweight-charts';
import DeribitSocket from '../json-rpc/DeribitSocket';

const PriceChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const markPriceSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const lastPriceSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const [markPrice, setMarkPrice] = useState<number | null>(null);
  const [lastPrice, setLastPrice] = useState<number | null>(null);

  const getChartWidth = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      width: screenWidth - 50,
      height: screenHeight - 50,
    };
  };

  useLayoutEffect(() => {
    const chart = initializeChart();
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chartRef.current?.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      chart?.remove();
    };
  }, []);

  const initializeChart = () => {
    if (chartContainerRef.current) {
      const { width, height } = getChartWidth();
      const chart = createChart(chartContainerRef.current, {
        width,
        height,
        layout: {
          background: { color: '#141414' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: '#444' },
          horzLines: { color: '#444' },
        },
      });

      markPriceSeriesRef.current = chart.addLineSeries({
        color: '#FF0000',
        lineWidth: 2,
      });

      lastPriceSeriesRef.current = chart.addLineSeries({
        color: '#0000FF',
        lineWidth: 2,
      });

      chart.priceScale('right').applyOptions({ autoScale: true });
      chartRef.current = chart;

      return chart;
    }
    return null;
  };

  useEffect(() => {
    const updatePrices = (mark_price: number, last_price: number, timestamp: number) => {
      const newTime = Math.floor(timestamp / 1000) as Time;
      setMarkPrice(mark_price);
      setLastPrice(last_price);
      updateSeriesData(markPriceSeriesRef.current, newTime, mark_price);
      updateSeriesData(lastPriceSeriesRef.current, newTime, last_price);
    };

    const ws = new DeribitSocket(updatePrices);

    return () => {
      ws.close();
    };
  }, []);

  const updateSeriesData = (seriesRef: ISeriesApi<'Line'> | null, time: Time, value: number) => {
    if (seriesRef) {
      const newPoint: LineData = { time, value };
      const oldData = seriesRef.data() as LineData[];
      const updatedData = [...oldData, newPoint].sort((a, b) => Number(a.time) - Number(b.time));
      seriesRef.setData(updatedData);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h4>BTC-PERPETUAL
          <span 
              className='mark-price'
              title="Mark Price" 
          > 
              {markPrice !== null ? `$${markPrice.toFixed(2)}` : 'Loading...'}
          </span>
        </h4>
      </div>
      <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default PriceChart;

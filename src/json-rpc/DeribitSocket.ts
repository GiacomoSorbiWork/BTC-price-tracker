class DeribitSocket {
    private ws: WebSocket;
    private lastTimestamp: number = 0;
  
    constructor(onUpdate: (mark_price: number, last_price: number, timestamp: number) => void) {
      this.ws = new WebSocket(process.env.DERIBIT_WS_URL || 'wss://test.deribit.com/ws/api/v2');
  
      this.ws.onopen = () => {
        setInterval(() => {
          this.ws.send(
            JSON.stringify({
              jsonrpc: '2.0',
              id: 8106,
              method: 'public/ticker',
              params: { instrument_name: 'BTC-PERPETUAL' },
            })
          );
        }, 1000);
        console.log('Connected to Deribit WebSocket');
      };
  
      this.ws.onmessage = (event: MessageEvent) => {
        const response = JSON.parse(event.data);
        if (response.result && response.result.last_price && response.result.timestamp) {
          const { mark_price, last_price, timestamp } = response.result;
          const newTime = Math.floor(timestamp / 1000);
          if (newTime > this.lastTimestamp) {
            this.lastTimestamp = newTime;
            onUpdate(mark_price, last_price, timestamp);
          }
        }
      };
  
      this.ws.onclose = () => {
        console.log('Disconnected from Deribit WebSocket');
      };
    }
  
    close() {
      this.ws.close();
    }
  }
  
  export default DeribitSocket;
  
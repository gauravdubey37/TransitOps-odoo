export interface VoiceIntentResponse {
  intent: string;
  confidence: number;
  entities: Record<string, any>;
  raw_text: string;
}

export interface IAnalyticsClient {
  parseVoiceIntent(audioOrTextPayload: string): Promise<VoiceIntentResponse>;
  confirmVoiceAction(intent: string, data: any): Promise<boolean>;
  getVoiceTasks(): Promise<any[]>;
  getEngineStatus(): Promise<{ status: string; uptime: number }>;
}

class MockAnalyticsClient implements IAnalyticsClient {
  async parseVoiceIntent(payload: string): Promise<VoiceIntentResponse> {
    return {
      intent: 'LOG_FUEL',
      confidence: 0.95,
      entities: { vehicle_id: 'V-100', amount: 50 },
      raw_text: payload
    };
  }

  async confirmVoiceAction(intent: string, data: any): Promise<boolean> {
    return true;
  }

  async getVoiceTasks(): Promise<any[]> {
    return [{ task_id: 't1', type: 'pending_confirmation' }];
  }

  async getEngineStatus(): Promise<{ status: string; uptime: number }> {
    return { status: 'mock_online', uptime: 99999 };
  }
}

class HttpAnalyticsClient implements IAnalyticsClient {
  private baseUrl = process.env.ANALYTICS_SERVICE_URL || 'http://localhost:8000';

  async parseVoiceIntent(payload: string): Promise<VoiceIntentResponse> {
    // In production, this would make an actual HTTP request to the Python engine
    // const response = await axios.post(`${this.baseUrl}/voice/intent`, { payload });
    // return response.data;
    throw new Error('HttpAnalyticsClient not fully implemented in MVP');
  }

  async confirmVoiceAction(intent: string, data: any): Promise<boolean> {
    throw new Error('HttpAnalyticsClient not fully implemented in MVP');
  }

  async getVoiceTasks(): Promise<any[]> {
    throw new Error('HttpAnalyticsClient not fully implemented in MVP');
  }

  async getEngineStatus(): Promise<{ status: string; uptime: number }> {
    throw new Error('HttpAnalyticsClient not fully implemented in MVP');
  }
}

export const getAnalyticsClient = (): IAnalyticsClient => {
  const provider = process.env.ANALYTICS_PROVIDER || 'mock';
  if (provider === 'http') {
    return new HttpAnalyticsClient();
  }
  return new MockAnalyticsClient();
};

export const analyticsClient = getAnalyticsClient();

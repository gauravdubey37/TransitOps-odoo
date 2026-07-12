import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Mic, MicOff, MessageSquare, Sparkles } from 'lucide-react';

export const DriverVoice: React.FC = () => {
  const queryClient = useQueryClient();
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState<{ id: number; text: string; sender: 'driver' | 'ai' }[]>([
    { id: 1, text: "Hello! Press the microphone button and state your command (e.g. 'Log toll expense 320 INR').", sender: 'ai' },
  ]);

  const addVoiceTaskMutation = useMutation({
    mutationFn: (task: { command: string; interpretedIntent: string; response: string }) =>
      api.post('/voiceTasks', { ...task, timestamp: new Date().toISOString() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voiceTasks'] });
    },
  });

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      // Simulate speech-to-text response
      const phrases = [
        "Log toll expense 320 INR for Khalapur",
        "Log fuel log 120 Liters cost 11400 INR",
        "Show my active trip",
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      handleCommandInput(randomPhrase);
    } else {
      setRecording(true);
      setTranscript('Listening to audio...');
    }
  };

  const handleCommandInput = (commandText: string) => {
    setTranscript(commandText);
    
    // Parse intent (mock NLP in frontend client)
    let intent = 'unknown';
    let response = "I couldn't quite understand that. Please say something like: 'Log toll expense 320 INR'.";

    if (commandText.toLowerCase().includes('toll') || commandText.toLowerCase().includes('expense')) {
      intent = 'log_expense';
      response = "Got it. Logging a Toll Expense record of 320 INR. Submitted to dispatcher for approval.";
    } else if (commandText.toLowerCase().includes('fuel') || commandText.toLowerCase().includes('liters')) {
      intent = 'log_fuel';
      response = "Acknowledged. Logging 120 Liters fuel refill for vehicle. Saved successfully.";
    } else if (commandText.toLowerCase().includes('trip') || commandText.toLowerCase().includes('active')) {
      intent = 'show_trip';
      response = "Navigating to your active trip screen.";
    }

    setHistory(prev => [
      ...prev,
      { id: Date.now(), text: commandText, sender: 'driver' },
      { id: Date.now() + 1, text: response, sender: 'ai' },
    ]);

    addVoiceTaskMutation.mutate({
      command: commandText,
      interpretedIntent: intent,
      response,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] justify-between space-y-4">
      {/* Dialog History Panel */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-lg border border-border bg-card shadow-sm text-xs">
        {history.map(item => (
          <div
            key={item.id}
            className={`flex ${item.sender === 'driver' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg leading-relaxed ${
                item.sender === 'driver'
                  ? 'bg-primary text-primary-foreground rounded-tr-none'
                  : 'bg-muted text-foreground rounded-tl-none border border-border'
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5 text-[9px] opacity-75">
                {item.sender === 'driver' ? 'You' : 'TransitOps AI'}
                {item.sender === 'ai' && <Sparkles className="h-2.5 w-2.5" />}
              </div>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mic Input controls & waveform animation */}
      <div className="flex flex-col items-center justify-center p-4 border border-border bg-card rounded-lg shadow-sm space-y-4">
        {recording ? (
          <div className="flex space-x-1 items-center justify-center h-8">
            <span className="h-6 w-1 bg-primary rounded animate-bounce [animation-delay:0.1s]"></span>
            <span className="h-8 w-1 bg-primary rounded animate-bounce [animation-delay:0.2s]"></span>
            <span className="h-5 w-1 bg-primary rounded animate-bounce [animation-delay:0.3s]"></span>
            <span className="h-7 w-1 bg-primary rounded animate-bounce [animation-delay:0.4s]"></span>
            <span className="h-4 w-1 bg-primary rounded animate-bounce [animation-delay:0.5s]"></span>
          </div>
        ) : (
          <div className="text-[10px] text-muted-foreground italic flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" /> Tap mic to speak
          </div>
        )}

        <button
          onClick={toggleRecording}
          className={`flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95 ${
            recording ? 'bg-destructive text-destructive-foreground animate-pulse' : 'bg-primary text-primary-foreground'
          }`}
        >
          {recording ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
        </button>

        {transcript && (
          <div className="text-[11px] bg-muted px-3 py-1.5 rounded-full text-center max-w-xs truncate border border-border font-medium text-foreground">
            "{transcript}"
          </div>
        )}
      </div>
    </div>
  );
};
export default DriverVoice;

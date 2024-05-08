export interface GEvent {
  summary: string;
  location: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurrence: string[];
  attendees: { email: string }[];
  reminders: {
    useDefault: boolean;
    overrides: { method: string; minutes: number }[];
  };
}

export const event: GEvent = {
  summary: "Hello World",
  location: "",
  start: {
    dateTime: "2024-03-17T09:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  end: {
    dateTime: "2024-03-17T17:00:00-07:00",
    timeZone: "America/Los_Angeles",
  },
  recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
  attendees: [],
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 10 },
    ],
  },
};

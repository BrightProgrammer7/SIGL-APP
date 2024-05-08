import { useEffect, useState } from "react";
import "./App.css";
import { gapi } from "gapi-script";
import Event from "./Event.tsx";
// import Post from "./pages/Post";
import { event, GEvent } from "./event.ts";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
interface EventItem {
  id: string;
  summary: string;
}
import { lazy, Suspense } from "react";
const Post = lazy(() => import("./pages/Post"));


const calendarID: string = import.meta.env.VITE_CALENDAR_ID;
const apiKey: string = import.meta.env.VITE_GOOGLE_API_KEY;
const accessToken: string = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN;
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/posts" element={<Post />} /> */}
          <Route path="/posts" element={<Suspense fallback={<div>Loading...</div>}> <Post />
          </Suspense>} />
        </Routes>
      </Router>
    </>
  );
}
function Home(): JSX.Element {
  const [events, setEvents] = useState<EventItem[]>([]);
  const navigate = useNavigate();

  // const addEvent = (calendarID: string, apiKey: string, event: GEvent, accessToken: string) => {
  const addEvent = (calendarID: string, event: GEvent, accessToken: string) => {
    function initiate() {
      gapi.client
        .request({
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // apiKey: apiKey,
          },
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`
        })
        .then(
          (response) => {
            return [true, response];
          },
          (err) => {
            console.log(err);
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };



  const getEvents = (calendarID: string, apiKey: string): void => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            const events = response.result.items as EventItem[];
            setEvents(events);
          },
          function (err) {
            console.error("Error fetching events:", err);
          }
        );
    }
    gapi.load("client", initiate);
  };

  useEffect(() => {
    if (calendarID && apiKey) {
      getEvents(calendarID, apiKey);
    } else {
      console.error("Calendar ID or API key is missing.");
    }
  }, [

  ]);

  return (
    <div className="App py-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">
        React App with Google Calendar API!
      </h1>
      <a onClick={() => navigate("/posts")}>Go Sheet</a>

      {/* <button type="submit" onClick={() => addEvent(calendarID, apiKey, event, accessToken)}>Add Event</button> */}
      <button type="submit" onClick={() => addEvent(calendarID, event, accessToken)}>Add Event</button>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="flex justify-center">
            <Event description={event.summary} />
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;

// import { gapi } from "gapi-script";
// type Response = {
//   result: { items: [] };
// };

// interface EventItem {
//   id: string;
//   summary: string;
// }


// // export const getEvents = (calendarID: string, apiKey: string):void => {
// //   function initiate() {
// //     gapi.clientd
// //       .init({
// //         apiKey: apiKey,
// //       })

// //       .then(function () {
// //         return gapi.client.request({
// //           path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
// //         });
// //       })

// //       .then(
// //         (response: Response) => {
// //           const events = response.result.items;
// //           return events;
// //         },
// //         function (err: Error) {
// //           return [false, err];
// //         }
// //       );
// //   }

// //   // return gapi.load("client", initiate);
// //    gapi.load("client", initiate);
// // };

// export const getEvents = (calendarID: string, apiKey: string): void => {
//   function initiate() {
//     gapi.client
//       .init({
//         apiKey: apiKey,
//       })
//       .then(function () {
//         return gapi.client.request({
//           path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
//         });
//       })
//       .then(
//         (response: any) => {
//           let events = response.result.items as EventItem[];
//           setEvents(events);
//         },
//         function (err: Error) {
//           console.error("Error fetching events:", err);
//         }
//       );
//   }
//   gapi.load("client", initiate);
// };

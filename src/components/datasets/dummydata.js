export default {
  success: true,
  error: null,
  response: [
    {
      id: null,
      loc: {
        lat: 14.6042,
        long: 120.9822,
      },
      place: {
        name: "manila",
        state: "ncr",
        country: "ph",
      },
      periods: [
        {
          dateTimeISO: "2020-11-22T21:00:00+08:00",
          timestamp: 1606050000,
          aqi: 30,
          category: "good",
          color: "00E400",
          method: "airnow",
          dominant: "pm2.5",
          pollutants: [
            {
              type: "o3",
              name: "ozone",
              valuePPB: 25,
              valueUGM3: 50,
              aqi: 23,
              category: "good",
              color: "00E400",
            },
            {
              type: "pm2.5",
              name: "particle matter (<2.5µm)",
              valuePPB: null,
              valueUGM3: 7.2,
              aqi: 30,
              category: "good",
              color: "00E400",
            },
            {
              type: "pm10",
              name: "particle matter (<10µm)",
              valuePPB: null,
              valueUGM3: 15,
              aqi: 14,
              category: "good",
              color: "00E400",
            },
            {
              type: "co",
              name: "carbon monoxide",
              valuePPB: 140,
              valueUGM3: 160,
              aqi: 2,
              category: "good",
              color: "00E400",
            },
            {
              type: "no2",
              name: "nitrogen dioxide",
              valuePPB: 9,
              valueUGM3: 18,
              aqi: 8,
              category: "good",
              color: "00E400",
            },
            {
              type: "so2",
              name: "sulfur dioxide",
              valuePPB: 0,
              valueUGM3: 0.786,
              aqi: 0,
              category: "good",
              color: "00E400",
            },
          ],
        },
      ],
      profile: {
        tz: "Asia/Manila",
        sources: [
          {
            name: "CAMS",
          },
        ],
        stations: null,
      },
    },
  ],
};

export const registerEvent = async (eventName: string, params?: object) => {
  const measurement_id = process.env.GA_MEASUREMENT_ID;
  const api_secret = process.env.GA_API_SECRET;

  try {
    const addEvent = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: "SOME_UNIQUE_CLIENT_ID",
          events: [
            {
              name: eventName,
              params: { ...params },
            },
          ],
        }),
      }
    );
    console.log(addEvent.status);
    return addEvent;
  } catch (error) {
    console.error("error logging event:", error);
  }
};

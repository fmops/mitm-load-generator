export const actions = {
  a: async (event) => {
    console.log("A was called")
    return await (await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m")).json();
  },
  b: async (event) => {
    console.log("B was called")
    return await (await fetch("https://dreamcatcher.blueteam.ai/api/v1/stub/openai/v1/chat/completions", {
      headers: {
        "Authorization": "Bearer foo",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "model": "foo"
      })
    })).json();
  },
  c: async (event) => {
    console.log("C was called")
    return await (await fetch("https://ifconfig.me", {
      headers: { "Accept": "application/json" }
    })).text();
  }
}

import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day, TimeZone } from "https://js.sabae.cc/DateTime.js";

const url = Deno.args[0];

const key = await Deno.readTextFile(Deno.args[1]);
const cert = await Deno.readTextFile(Deno.args[2]);
const client = Deno.createHttpClient({ key, cert });

const opt = {
  client,
  method: "GET",
};

const data = await (await fetch(url, opt)).json();
await Deno.writeTextFile("data/" + new Day(TimeZone.JST).toString() + ".csv", CSV.stringify(data));
await Deno.writeTextFile("latest_dino_sum.csv", CSV.stringify(data));
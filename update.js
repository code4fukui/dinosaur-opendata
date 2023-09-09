import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day, TimeZone } from "https://js.sabae.cc/DateTime.js";

const url = Deno.args[0];

const data = await (await fetch(url)).json();
await Deno.writeTextFile("data/" + new Day(TimeZone.JST).toString() + ".csv", CSV.stringify(data));
await Deno.writeTextFile("latest_dino_sum.csv", CSV.stringify(data));


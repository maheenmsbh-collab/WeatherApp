export function getBackgroundImage(condition) {
  if (!condition) return "url('/images/nuetral.png')";

  
  const lower = condition.toString().toLowerCase()

  console.log(" condition:", lower); 

  if (lower.includes("sunny") )
    return "url('/images/sunny.png')";

  if (lower.includes("cloud")) return "url('/images/clouds.png')";

  if (lower.includes("rain") || lower.includes("patchy rain nearby")){
   
     console.log("run")
    return "url('/images/rain.png')";}

  if (lower.includes("overcast")) return "url('/images/overcast.png')";
  if(lower.includes("clear")) return "url('/images/clear.png')"

  if (lower.includes("snow")) return "url('/images/snow.png')";

  if (lower.includes("storm") || lower.includes("thunder"))
    return "url('/images/thunder.png')";

  if (lower.includes("mist") || lower.includes("fog") || lower.includes("haze"))
    return "url('/images/fog.png')";

  return "url('/images/nuetral.png')";
}
export default getBackgroundImage
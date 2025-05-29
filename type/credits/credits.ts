import Cast from "./cast";
import Crew from "./crew";

export default interface Credits{
    id : number,
    cast : Cast[],
    crew : Crew[],
}
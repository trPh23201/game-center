import { configureStore } from "@reduxjs/toolkit";
import Card1 from "../features/gameChooseCard/Card1";
import Card2 from "../features/gameChooseCard/Card2";
import RightCard from "../features/gameChooseCard/RightCard";
import RandomArr from "../features/gameChooseCard/RandomArr";
import Time from "../features/gameChooseCard/Time";
import Live from "../features/gameChooseCard/Live";
import Win from "../features/gameChooseCard/Win";

export const store = configureStore({
    reducer:{
        Card1,
        Card2,
        RightCard,
        RandomArr,
        Time,
        Live,
        Win
    }
})
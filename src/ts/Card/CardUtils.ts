import {Card} from "./Card";
import {Rank} from "./CardEnums";


export function getNumericRank(rank: Rank) : number {
    if (rank == Rank.ACE) {
        return 0;
    }
    if (rank == Rank.JACK) {
        return 11;
    }
    if (rank == Rank.QUEEN) {
        return 12;
    }
    if (rank == Rank.KING) {
        return 13;
    }
    return parseInt(rank);
}

export function getNumericRankFromCard(card :Card) : number {
    return getNumericRank(card.rank);
}

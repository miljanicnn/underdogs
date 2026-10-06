const FPL_API_URL = "https://fantasy.premierleague.com/api"

// FPL element corresponds to a player
export type FplElement = {
    id: number;
    web_name: string;
    first_name: string;
    second_name: string;
    team: number;
    element_type: number;
    selected_by_percent: string;
}

export type FplBootstrapStatic = {
    elements: FplElement[];
    events: FplEvent[];
}

export async function fetchBootstrapStatic(): Promise<FplBootstrapStatic> {
    const response = await fetch(`${FPL_API_URL}/bootstrap-static/`)

    if(!response.ok) {
        throw new Error(`FPL request failed: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as FplBootstrapStatic
}

// FPL event corresponds to a gameweek
export type FplEvent = {
    id: number;
    name: string;
    deadline_time: string;
    finished: boolean;
    data_checked: boolean;
}
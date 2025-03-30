import axios from "axios"

const API_URL = "https://vit-tm-task.api.trademarkia.app/api/v3/us"

export const fetchTrademarks = async (query: string) => {
  const body = {
    input_query: query,
    input_query_type: "",
    sort_by: "default",
    status: [],
    exact_match: false,
    date_query: false,
    owners: [],
    attorneys: [],
    law_firms: [],
    mark_description_description: [],
    classes: [],
    page: 1,
    rows: 10,
    sort_order: "desc",
    states: [],
    counties: [],
  }

  try {
    const response = await axios.post(API_URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {

      const status = error.response.status
      if (status === 404) {
        alert("No results found.") 
        return null
      } else if (status >= 400 && status < 500) {
        alert("Client error occurred.") 
        return null
      } else if (status >= 500) {
        alert("Server error occurred.")
        return null
      }
    }
    alert("An unexpected error occurred.") 
    return null
  }
}
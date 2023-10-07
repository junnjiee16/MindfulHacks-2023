import axios from "axios";

export async function textToEmoji(todoTitle) {
    let response;
    try {
      response = await axios.post(
        "http://127.0.0.1:5000/predict-emoji",
        {
          text: todoTitle,
        },
      );
    } catch (error) {
      console.log("DEBUG ERROR", error);
      error.code == "ERR_NETWORK"
        ? (response = null)
        : (response = error.response);
    }
    return response;
  }
  
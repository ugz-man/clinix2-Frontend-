import { BASE_BACKEND_URL } from "./constants";

export async function wakeServer() {
  try {
    await fetch(`${BASE_BACKEND_URL}`);
    await fetch(`${BASE_BACKEND_URL}`);
  } catch {
    console.log();
  }
}

export async function sendTextMessage(message) {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/api/v1/messages`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      if (error.status === "fail" || error.status === "error") {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function uploadImageToServer(imageFile) {
  try {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    const response = await fetch(
      `${BASE_BACKEND_URL}/api/v1/messages/image-file`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      if (error.status === "fail" || error.status === "error") {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUserMessages(userId) {
  console.log("called");
  navigator.sendBeacon(`${BASE_BACKEND_URL}/api/v1/messages/${userId}`);
}

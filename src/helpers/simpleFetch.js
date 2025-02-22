export default async function simpleFetch(url, method = "GET", headers = null, body = null) {
  try {
    const validMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    if (!validMethods.includes(method)) {
      throw new Error(`Método HTTP no válido: ${method}`);
    }

    //Configure fetch options
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    // If method isn't GET, add body
    if (method !== "GET" && body) {
      if (typeof body !== "object" || Object.keys(body).length === 0) {
        throw new Error("Se debe proporcionar un body válido para métodos distintos de GET.");
      }
      options.body = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url, options);
    const responseData = await response.json();

    // Verify HTTP status
    if (!response.ok) {
      throw new Error(responseData.message || `Error en la petición: ${response.status}`);
    }

    return {
      data: responseData,
      isSuccess: true,
    };
  } catch (error) {
    return {
      data: error.message || error,
      isSuccess: false,
    };
  }
}

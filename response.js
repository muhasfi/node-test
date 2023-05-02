const response = (statusCode, data, message, res) => {
    res.status(200).json([
        {
        status:statusCode,
        payload: data,
        message: message,
        metadata: {
            prev: "",
            next: "",
            max: ""
        }}
    ])
}

export default response;
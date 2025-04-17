function ImageAndTextMessage({ message }) {
  if (message.role === "user") {
    return (
      <div className="mb-1 flex w-11/12 flex-col self-end rounded-sm p-2 text-white md:w-1/3 md:text-lg">
        <div>
          <img
            crossOrigin="use-credentials"
            src={message.imageLink}
            className="aspect-square w-full"
          />
        </div>
        <div className="bg-primary-500 dark:bg-dark-primary-700 p-1 wrap-break-word whitespace-pre-wrap">
          {message.text}
        </div>
      </div>
    );
  }
}

export default ImageAndTextMessage;

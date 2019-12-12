worker.onMessage(({ msg }) => {
  console.log(
    "%c" + msg,
    `
    color: red; 
    font-size: 30px;
    `
  );
});

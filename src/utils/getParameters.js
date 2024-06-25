function parse(args, argsWithValues = []) {
  const temp = [];

  if (args.length > 0) {
    args.map((item) => {
      temp[item.replace("--", "").split("=")[0]] = item
        .replace("--", "")
        .split("=")[1];
    });
  }

  return temp;
}
module.exports.parse = parse;

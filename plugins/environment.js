const DomAnimator = function () {
  let currentFrame = 0;
  const frames = [];
  const nodes = [];

  // Chrome console shows new lines, others don't...
  // so multiple comments are used on others, to look good.
  const multiNode = !window.chrome;

  let interval = null;
  const defaultTime = 500; // ms
  const attached = false;
  const whiteSpaceString = "\u00A0";

  // Soft object augmentation
  function extend(target, source) {
    Object.keys(source).forEach((key) => {
      if (!(key in target)) {
        target[key] = source[key];
      }
    });
    return target;
  }

  function swapWhitespace(array) {
    let i = 0;

    for (i; i < array.length; i++) {
      array[i] = array[i].replace(/ /g, whiteSpaceString);
    }
    return array;
  }

  function padString(string) {
    return `\n${string}\n`;
  }

  // Frame passed through as a list []
  function parseMultilineFrame(frame) {
    if (multiNode) {
      return swapWhitespace(frame);
    }
    return padString(frame.join("\n"));
  }

  // Frame passed through as a string.
  function parseSingleLineFrame(frame) {
    if (multiNode) {
      return swapWhitespace(frame.split("\n"));
    }
    return padString(frame);
  }

  function attachToDocument() {
    const { head } = document;
    const parent = head.parentNode;

    // This assumes you have the same amount of frames in each section.
    if (multiNode) {
      let i = 0;
      const totalNodes = frames[0].length;
      for (i; i < totalNodes; i++) {
        const node = document.createComment("");
        nodes.push(node);
        parent.insertBefore(node, head);
      }
    } else {
      const node = document.createComment("");
      nodes.push(node);
      parent.insertBefore(node, head);
    }
  }

  function renderFrame() {
    const frameData = frames[currentFrame];

    if (multiNode) {
      let i = 0;
      for (i; i < nodes.length; i++) {
        nodes[i].nodeValue = frameData[i];
      }
    } else {
      nodes[0].nodeValue = frameData;
    }

    currentFrame += 1;
    if (currentFrame === frames.length) {
      currentFrame = 0;
    }
  }

  function animate(time) {
    // No time set, just use default!
    if (!time) {
      time = defaultTime;
    }

    // No frames
    if (frames.length === 0) {
      console.log(
        "I need frames to animate. You can add them with .addFrame( string )"
      );
      return;
    }

    if (attached === false) {
      attachToDocument();
    }

    interval = setInterval(() => {
      renderFrame();
    }, time);
  }

  function stop() {
    clearInterval(interval);
  }

  function addFrame(frameData) {
    if (!frameData) {
      frameData = "no frame data";
    }

    const frameType = typeof frameData;

    // Multi line data.
    if (frameType === "object") {
      frames.push(parseMultilineFrame(frameData));

      // String data
    } else if (frameType === "string") {
      frames.push(parseSingleLineFrame(frameData));
    }
  }

  function main() {}

  return extend(main, {
    addFrame,
    animate,
    stop,
  });
};

export default () => {
  const domAnimator = new DomAnimator();
  const environments = {
    development: "Desarrollo",
    production: "Producción",
  };
  const environment = environments[process.env.NODE_ENV];
  console.log(
    `%c Entorno detectado %c ${environment} %c  %c Presentación creada por: %c Alex Borbolla %c https://github.com/dalexhd`,
    "background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
    "background: #1972F5; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;",
    "background:transparent",
    "background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
    "background: #1972F5; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;",
    "background:transparent"
  );
  if (process.env.NODE_ENV === "production") {
    const frame1 = [
      `       .-"-.       𝙀𝙉𝙏𝙊𝙍𝙉𝙊 𝘿𝙀𝙏𝙀𝘾𝙏𝘼𝘿𝙊: ${environment}`,
      `     _/.-.-.\\_`,
      "    ( ( o o ) )    𝘾𝙍𝙀𝘼𝘿𝙊 𝙋𝙊𝙍: Alex Borbolla (https://github.com/dalexhd)",
      '     |/  "  \\|     ',
      "      \\'/^\\'/      ¡𝘾𝙪𝙞𝙙𝙖𝙙𝙤! 𝙀𝙨𝙩𝙚 𝙗𝙞𝙘𝙝𝙤 𝙡𝙡𝙖𝙢𝙖𝙙𝙤 𝙁𝙧𝙚𝙙𝙙𝙞 𝙩𝙚 𝙚𝙨𝙩á 𝙞𝙣𝙩𝙚𝙣𝙩𝙖𝙣𝙙𝙤 𝙨𝙪𝙥𝙡𝙖𝙣𝙩𝙖𝙧 𝙩𝙪 𝙞𝙙𝙚𝙣𝙩𝙞𝙙𝙖𝙙. ¡𝘾𝙞𝙚𝙧𝙧𝙖 𝙚𝙨𝙩𝙖 𝙫𝙚𝙣𝙩𝙖𝙣𝙖 𝙞𝙣𝙢𝙚𝙙𝙞𝙖𝙩𝙖𝙢𝙚𝙣𝙩𝙚 𝙥𝙤𝙧 𝙛𝙖𝙫𝙤𝙧!",
      "      /`\\ /`\\      ",
      "     /  /|\\  \\     ",
      "    ( (/ T \\) )    ",
      "     \\__/^\\__/     ",
    ];
    const frame2 = [
      `       .-"-.       𝙀𝙉𝙏𝙊𝙍𝙉𝙊 𝘿𝙀𝙏𝙀𝘾𝙏𝘼𝘿𝙊: ${environment}`,
      `     _/_-.-_\\_`,
      "    / __> <__ \\    𝘾𝙍𝙀𝘼𝘿𝙊 𝙋𝙊𝙍: Alex Borbolla (https://github.com/dalexhd)",
      '   / //  "  \\\\ \\   ',
      "  / / \\'---'/ \\ \\  ¡𝘾𝙪𝙞𝙙𝙖𝙙𝙤! 𝙀𝙨𝙩𝙚 𝙗𝙞𝙘𝙝𝙤 𝙡𝙡𝙖𝙢𝙖𝙙𝙤 𝙁𝙧𝙚𝙙𝙙𝙞 𝙩𝙚 𝙚𝙨𝙩á 𝙞𝙣𝙩𝙚𝙣𝙩𝙖𝙣𝙙𝙤 𝙨𝙪𝙥𝙡𝙖𝙣𝙩𝙖𝙧 𝙩𝙪 𝙞𝙙𝙚𝙣𝙩𝙞𝙙𝙖𝙙. ¡𝘾𝙞𝙚𝙧𝙧𝙖 𝙚𝙨𝙩𝙖 𝙫𝙚𝙣𝙩𝙖𝙣𝙖 𝙞𝙣𝙢𝙚𝙙𝙞𝙖𝙩𝙖𝙢𝙚𝙣𝙩𝙚 𝙥𝙤𝙧 𝙛𝙖𝙫𝙤𝙧!",
      '  \\ \\_/`"""`\\_/ /  ',
      "   \\           /   ",
      "    \\         /    ",
      "     |   .   |     ",
    ];
    const frame3 = [
      `       .-"-.       𝙀𝙉𝙏𝙊𝙍𝙉𝙊 𝘿𝙀𝙏𝙀𝘾𝙏𝘼𝘿𝙊: ${environment}`,
      `     _/_-.-_\\_`,
      "    /|( o o )|\\    𝘾𝙍𝙀𝘼𝘿𝙊 𝙋𝙊𝙍: Alex Borbolla (https://github.com/dalexhd)",
      '   | //  "  \\\\ |   ',
      "  / / \\'---'/ \\ \\  ¡𝘾𝙪𝙞𝙙𝙖𝙙𝙤! 𝙀𝙨𝙩𝙚 𝙗𝙞𝙘𝙝𝙤 𝙡𝙡𝙖𝙢𝙖𝙙𝙤 𝙁𝙧𝙚𝙙𝙙𝙞 𝙩𝙚 𝙚𝙨𝙩á 𝙞𝙣𝙩𝙚𝙣𝙩𝙖𝙣𝙙𝙤 𝙨𝙪𝙥𝙡𝙖𝙣𝙩𝙖𝙧 𝙩𝙪 𝙞𝙙𝙚𝙣𝙩𝙞𝙙𝙖𝙙. ¡𝘾𝙞𝙚𝙧𝙧𝙖 𝙚𝙨𝙩𝙖 𝙫𝙚𝙣𝙩𝙖𝙣𝙖 𝙞𝙣𝙢𝙚𝙙𝙞𝙖𝙩𝙖𝙢𝙚𝙣𝙩𝙚 𝙥𝙤𝙧 𝙛𝙖𝙫𝙤𝙧!",
      '  \\ \\_/`"""`\\_/ /  ',
      "   \\           /   ",
      "    \\         /    ",
      "     |   .   |     ",
    ];
    domAnimator.addFrame(frame1);
    domAnimator.addFrame(frame2);
    domAnimator.addFrame(frame3);
    domAnimator.animate(1000);
    console.log(
      `%c Si alguien te pide que hagas algo aquí: %c ¡%cAtención%c! Puede estar intentando suplantar tu identidad. %c Más info: %c https://www.avast.com/es-es/c-xss`,
      "color: #ffffff; background: #de8e0f; border: 1px solid #a71c0d;border-right: none; border-radius: 3px 0 0 3px;font-size:22px",
      "color: #ffffff; background: #d93625; border: 1px solid #a71c0d;font-weight: bold;border-left: none; border-right: none;font-size:22px;",
      "color: #ffffff; background: #d93625; border: 1px solid #a71c0d;font-weight: bold;border-left: none; border-right: none;font-size:22px;text-decoration: underline;",
      "color: #ffffff; background: #d93625; border: 1px solid #a71c0d;font-weight: normal;border-left: none; border-radius: 0 3px 3px 0;font-size:22px",
      "color: #ffffff; background: #1d69db; border: 1px solid #a71c0d;font-weight: normal;border-left: none; border-radius: 0 3px 3px 0;",
      "background:transparent"
    );
  }
};

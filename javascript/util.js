export const pickHex = (color1, color2, weight) => {
    let w1 = weight;
    let w2 = 1 - w1;
    let rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return `rgb(${Math.max(0,rgb[0])}, ${Math.max(0,rgb[1])}, ${Math.max(0,rgb[2])})`;
};

export const degToRadian = (deg) => {
    return deg * Math.PI/180;
};

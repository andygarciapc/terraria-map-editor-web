import Main from "/canvas/main.js";

import store from "/state/store.js";
import { stateChange } from "/state/state.js";

import colors from "/utils/dbs/colors.js";

const onPencilClick = async (e) => {
    if (Main.listeners.dragging) {
        Main.listeners.dragging = false;
        return;
    }

    store.dispatch(stateChange(["status", "loading"], true));

    let tilesArray = [];

    let sizeHalfX = Main.state.optionbar.size[0] / 2,
        sizeHalfY = Main.state.optionbar.size[1] / 2;

    for (let x = Main.mousePosImageX - Math.floor(sizeHalfX); x < Main.mousePosImageX + Math.ceil(sizeHalfX); x++)
        for (let y = Main.mousePosImageY - Math.floor(sizeHalfY); y < Main.mousePosImageY + Math.ceil(sizeHalfY); y++)
            if (x >= 0 && y >= 0 && x < Main.state.canvas.worldObject.header.maxTilesX && y < Main.state.canvas.worldObject.header.maxTilesY)
                tilesArray.push([x,y]);

    let offset, selectedColor = colors[Main.state.optionbar.layer][Main.state.optionbar.id] ?? {r:0,g:0,b:0,a:0};

    if (Main.state.optionbar.id == 160) {
        let temp;
        tilesArray.forEach(([x, y]) => {
            temp = y % 3;
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor[temp].r;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor[temp].g;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor[temp].b;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor[temp].a;
        });
    }
    else if (Main.state.optionbar.id == 51) {
        let temp;
        tilesArray.forEach(([x, y]) => {
            temp = (x + y) % 2;
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor[temp].r;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor[temp].g;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor[temp].b;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor[temp].a;
        });
    }
    else {
        tilesArray.forEach(([x, y]) => {
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor.r;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor.g;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor.b;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor.a;
        });
    }

    Main.updateLayers(Main.state.optionbar.layer);

    await Main.workerInterfaces.editTiles(
        Main.state.optionbar.layer,
        "rectangle",
        [tilesArray[0], tilesArray[tilesArray.length - 1]],
        Main.state.optionbar.id
    );

    store.dispatch(stateChange(["status", "loading"], false));
}

const onPencilDrag = async (e) => {
    if (!Main.listeners.dragging)
        Main.listeners.dragging = true;

    if (Main.mousePosImageX == Main.listeners.prevMousePosImageX && Main.mousePosImageY == Main.listeners.prevMousePosImageY)
        return;

    store.dispatch(stateChange(["status", "loading"], true));

    Main.listeners.prevMousePosImageX = Main.mousePosImageX;
    Main.listeners.prevMousePosImageY = Main.mousePosImageY;

    let tilesArray = [];

    let sizeHalfX = Main.state.optionbar.size[0] / 2,
        sizeHalfY = Main.state.optionbar.size[1] / 2;

    for (let x = Main.mousePosImageX - Math.floor(sizeHalfX); x < Main.mousePosImageX + Math.ceil(sizeHalfX); x++)
        for (let y = Main.mousePosImageY - Math.floor(sizeHalfY); y < Main.mousePosImageY + Math.ceil(sizeHalfY); y++)
            if (x >= 0 && y >= 0 && x < Main.state.canvas.worldObject.header.maxTilesX && y < Main.state.canvas.worldObject.header.maxTilesY)
                tilesArray.push([x,y]);

    let offset, selectedColor = colors[Main.state.optionbar.layer][Main.state.optionbar.id] ?? {r:0,g:0,b:0,a:0};

    if (Main.state.optionbar.id == 160) {
        let temp;
        tilesArray.forEach(([x, y]) => {
            temp = y % 3;
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor[temp].r;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor[temp].g;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor[temp].b;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor[temp].a;
        });
    }
    else if (Main.state.optionbar.id == 51) {
        let temp;
        tilesArray.forEach(([x, y]) => {
            temp = (x + y) % 2;
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor[temp].r;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor[temp].g;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor[temp].b;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor[temp].a;
        });
    }
    else {
        tilesArray.forEach(([x, y]) => {
            offset = (Main.state.canvas.worldObject.header.maxTilesX * y + x) * 4;
            Main.layersImages[Main.state.optionbar.layer].data[offset] = selectedColor.r;
            Main.layersImages[Main.state.optionbar.layer].data[offset+1] = selectedColor.g;
            Main.layersImages[Main.state.optionbar.layer].data[offset+2] = selectedColor.b;
            Main.layersImages[Main.state.optionbar.layer].data[offset+3] = selectedColor.a;
        });
    }

    Main.updateLayers(Main.state.optionbar.layer);

    await Main.workerInterfaces.editTiles(
        Main.state.optionbar.layer,
        "rectangle",
        [tilesArray[0], tilesArray[tilesArray.length - 1]],
        Main.state.optionbar.id
    );

    store.dispatch(stateChange(["status", "loading"], false));
}

export {
    onPencilClick,
    onPencilDrag
}
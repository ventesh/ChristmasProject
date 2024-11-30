export declare const GLTFMagicBase64Encoded = "Z2xURg";
export declare const GLTFFileLoaderMetadata: {
    readonly name: "gltf";
    readonly extensions: {
        readonly ".gltf": {
            readonly isBinary: false;
        };
        readonly ".glb": {
            readonly isBinary: true;
        };
    };
    readonly canDirectLoad: (data: string) => boolean;
};

/**
 * Hls preset
 * @param command
 */
export const presetHls = (command: any) => {
	command
		.videoBitrate('14000k')
		.videoCodec('libx264')
		.fps(24)
		.audioCodec('copy');
};

/**
  * Video quality value:
  * Quality Quality Resolution Video Bit Rate
     Low 480 X 270 400kbps
     Moderate 640 X 360 800 - 1200kbps
     Tall 960 X 540/854 X 480 1200 - 1500kbps
     HD 1280 x 720 1500 - 4000kbps
     HD 1080 1920 x 1080 4000 - 8000kbps
     4K 3840 X 2160 8000- 14000kbps
  */

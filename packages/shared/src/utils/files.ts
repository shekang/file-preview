import fs from 'fs-extra';
/**
 * Ensure dir
 * @param dir
 * @returns
 */
const ensureDir = async (dir: string) => fs.ensureDir(dir);

/**
 * File stats
 * @param dir
 * @returns
 */
const fileStats = async (dir: string) => fs.statSync(dir);

export {ensureDir, fileStats};

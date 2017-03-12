interface SoundUrlLocation {
  root: String;
  files: String;
}

export function getSouldUrls(sl: SoundUrlLocation) {

  return sl.files.split('\n')
    .map(f => f.trim())
    .filter(f => f.length)
    .map(f => `${sl.root}/${f}`);

}


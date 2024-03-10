const cleanLicenseName = (license: string) =>
  license.replace(".txt", "").toUpperCase();

export default cleanLicenseName;

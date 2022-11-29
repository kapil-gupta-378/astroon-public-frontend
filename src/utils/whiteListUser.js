import Papa from 'papaparse';

// This function will be called when
// the file input changes
const csvFileHandler = (
  e,
  setError,
  setRawCsvFileData,
  setCsvFileParseData,
  setNewDataForTable,
  allowedExtensions,
  whiteListUserData,
) => {
  setError('');
  let newCsvFileData = [];
  // Check if user has entered the file
  if (e.target.files.length) {
    const inputFile = e.target.files[0];
    // Check the file extensions, if it not
    // included in the allowed extensions
    // we show the error
    const fileExtension = inputFile?.type.split('/')[1];
    if (!allowedExtensions.includes(fileExtension)) {
      setError('Please input a csv file');
      return;
    }
    // If input type is correct set the state
    setRawCsvFileData(inputFile);
    // a file we show a error
    if (!inputFile) return setError('Enter a valid file');
    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();
    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      for (let i = 0; i < parsedData.length; i++) {
        const columns = Object.keys(parsedData[i]);
        newCsvFileData.push(...columns);
      }
      setCsvFileParseData(newCsvFileData);
      setNewDataForTable(newCsvFileData, whiteListUserData);
    };
    reader.readAsText(inputFile);
  }
};

export { csvFileHandler };

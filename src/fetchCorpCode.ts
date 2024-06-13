
const fetchCorpCode = async (name: string): Promise<string|null> => {
  try {
    const response = await fetch("../CORPCODE.xml");
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");
    
    const lists = xmlDoc.getElementsByTagName('list');
    for (let i = 0; i < lists.length; i++) {
      const compName = lists[i].getElementsByTagName('corp_name')[0].textContent;
      if (name === compName) {
        return lists[i].getElementsByTagName('corp_code')[0].textContent;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching XML:', error);
    return null;
  }
};

export default fetchCorpCode;



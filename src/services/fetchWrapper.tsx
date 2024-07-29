const fetchWrapper = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('jwt');
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  };
  
  export default fetchWrapper;
  
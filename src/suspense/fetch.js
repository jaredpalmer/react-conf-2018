let token;

export function getToken() {
  return localStorage.getItem('spotify-token');
}

export const setToken = t => {
  token = t;
  localStorage.setItem('spotify-token', t);
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fetch = (url, options) => {
  const t = token || localStorage.getItem('spotify-token');
  return sleep(500).then(() =>
    window
      .fetch(url, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
        ...options,
      })
      .then(res => {
        if (res.status === 401) {
          token = undefined;
          localStorage.removeItem('spotify-token');
        }
        return res;
      })
  );
};

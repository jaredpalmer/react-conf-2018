let token;

export function getToken() {
  localStorage.getItem('spotify-token');
}

export const setToken = t => {
  token = t;
  localStorage.setItem('spotify-token', t);
};

export const fetch = (url, options) => {
  const t = token || localStorage.getItem('spotify-token');
  return window
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

        throw new Error('Unauthorized');
      }
      return res;
    });
};

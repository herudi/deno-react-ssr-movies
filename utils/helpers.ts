

export async function apiClient(url: string) {
    const result = await fetch((window as any).BASE_URL + url);
    const data = await result.json();
    return data;
}

export async function initLoad(url: string, setLoading?: Function) {
    if (setLoading) setLoading(true);
    let _data = await apiClient(url as string);
    if (setLoading) setLoading(false);
    //@ts-ignore
    document.title = _data.seo.title;
    return _data;
}
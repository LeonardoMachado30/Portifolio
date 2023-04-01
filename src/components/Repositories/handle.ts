import moment from "moment";

export function formatDate(date: any) {
    const dateCurrent = moment();
    const dateLastUpdate = moment(date?.updated_at);
    const year: number = dateCurrent.diff(dateLastUpdate, "years");
    const mouth: number = dateCurrent.diff(dateLastUpdate, "months") % 12;
    const day: number = dateCurrent.diff(dateLastUpdate, "days");
    const format: string = year > 1 || day > 1 ? `s` : "";
    const formatMouth: string = mouth > 1 ? `es` : "";
    let yearfull: string = "";

    if (year > 0) {
        yearfull = `${year} ano${format} `;
    }
    if (mouth > 0 && mouth < 12) {
        yearfull = yearfull + `${mouth} mes${formatMouth} `;
    }
    if (day > 0 && day < 32) {
        yearfull = yearfull + `${day} dia${format}`;
    }

    return yearfull;
}

export function orderByDate(date: any) {
    const dateCurrent = moment();
    return date
        .map((objeto: any) => {
            const dateLastUpdate = moment(objeto?.updated_at);
            return dateCurrent.diff(dateLastUpdate, "days");
        })
        .sort((a: any, b: any) => {
            return a - b;
        })
        .map((data: any) => {
            return date.find((obj: any) => {
                const dateLastUpdate = moment(obj?.updated_at);
                return data === dateCurrent.diff(dateLastUpdate, "days");
            });
        });
}


import { Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import 'moment/min/locales'
import { useTranslation } from 'react-i18next';

moment.locale('ar');

const api = 'https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=27f3f08fb5d81cd72a18a10d61a9331c';

let cancelAxios = null;

export default function Weather() {
    const { t, i18n } = useTranslation();
    // <== States ==>
        const [lang, setLang] = useState('ar');
    const [date, setDate] = useState('');
    const [temp, setTemp] = useState({
        main: 0,
        desc: '',
        min: 0,
        max: 0,
        icon: null
    });
    
    // <== UseEffects ==>
        useEffect(() => {
            i18n.changeLanguage(lang);
        }, [])
        useEffect(() => {
        // <== get date by moment js ==>
            setDate(moment().format('MMMM Do YYYY'));
        // <== get api by Axios ==>
            axios.get(api,
                {
                    cancelToken: new axios.CancelToken((c) => {
                        cancelAxios = c;
                    })
                }
        ).then((response) => {
            let data = response.data;
            const mainTemp = Math.round(data.main.temp - 272.15);
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;
            const minTemp = Math.round(data.main.temp_min - 272.15);
            const maxTemp = Math.round(data.main.temp_max - 272.15);
            console.log(mainTemp, desc, minTemp, maxTemp);
            setTemp({
                main: mainTemp,
                desc: desc,
                min: minTemp,
                max: maxTemp,
                icon: icon
            });
        });
        // <== Cancling ==>
        return () => {
            console.log("Cancel");
            cancelAxios();
        }
    }, []);
    return (
        <Container maxWidth='sm'>
            <Card sx={{ minWidth: 275, background: "rgba(0, 0, 0, 0.5)", color: "#fff" }}>
                <CardContent sx={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: "end", gap: '5px' }}>
                        <Typography variant="h2">
                            {t('Cairo')}
                        </Typography>
                        <Typography variant="h6">
                            {date}
                        </Typography>
                    </div>
                    <hr />
                    <div className="details" style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', flexDirection: 'column' }}>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="h1">
                                    {temp.main}
                                </Typography>
                                <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt="icon" />
                            </Stack>
                            <Typography variant="h6">
                                {t(temp.desc)}
                            </Typography>
                            <Stack direction="row" sx={{ gap: '5px', color: '#d3d3d3f7' }}>
                                <Typography variant="h6">
                                    {t('min')}: {temp.min}
                                </Typography>
                                <Typography variant="h6" sx={{ margin: "0 !important" }}>
                                    |
                                </Typography>
                                <Typography variant="h6">
                                    {t("max")}: {temp.max}
                                </Typography>
                            </Stack>
                        </div>
                        <CloudIcon style={{ fontSize: '250px' }} />
                    </div>
                </CardContent>
            </Card>
            <Button variant="text" sx={{
                color: 'white',
                marginTop: '10px'
            }}
                onClick={handleLang}>{lang === 'en' ? 'Arabic' : 'انجليزي'}</Button>
        </Container>
    );
    function handleLang() {
        if (lang === 'en') {
            setLang('ar');
            i18n.changeLanguage('ar');
            moment.locale('ar');
        }
        else {
            setLang('en');
            i18n.changeLanguage('en');
            moment.locale('en');
        }
        setDate(moment().format('MMMM Do YYYY'));
    }
}
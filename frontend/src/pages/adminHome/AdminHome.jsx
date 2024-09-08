import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useTranslation } from "react-i18next";
import style from "./AdminHome.module.css";

const AdminHome = () => {
    const { t } = useTranslation();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [accountsChartData, setAccountsChartData] = useState({});
    const [accountsChartOptions, setAccountsChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const labels = [
            t('january'), t('february'), t('march'), t('april'), 
            t('may'), t('june'), t('july'), t('august'), 
            t('september'), t('october'), t('november'), t('december')
        ];
        const createdAdsData = [65, 59, 80, 81, 56, 55, 40, 70, 60, 90, 95, 85];
        const soldItemsData = [28, 48, 40, 19, 86, 27, 90, 60, 50, 80, 75, 65];
        const activeAdsData = [50, 45, 70, 75, 40, 60, 30, 65, 55, 85, 88, 72];

        const calculateAverage = (data) => {
            let total = 0;
            for (let i = 0; i < data.length; i++) {
                total += data[i];
            }
            return total / data.length;
        };

        const createdAdsAverage = calculateAverage(createdAdsData);
        const soldItemsAverage = calculateAverage(soldItemsData);
        const activeAdsAverage = calculateAverage(activeAdsData);

        labels.push(t('annualAverage'));
        createdAdsData.push(createdAdsAverage);
        soldItemsData.push(soldItemsAverage);
        activeAdsData.push(activeAdsAverage);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: t('createdAds'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: createdAdsData
                },
                {
                    label: t('soldItems'),
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: soldItemsData
                },
                {
                    label: t('activeAds'),
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: activeAdsData
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        const pieData = {
            labels: [
                t('internalAccessories'),
                t('externalAccessories'),
                t('mechanicalComponents')
            ],
            datasets: [
                {
                    data: [12, 18, 25],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };

        const pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        };

        const accountsDataRaw = [20, 25, 30, 15, 40, 35, 45, 50, 60, 55, 65, 70];
        const accountsLabels = [...labels];

        const accountsAverage = calculateAverage(accountsDataRaw);

        accountsDataRaw.push(accountsAverage);
        accountsLabels.push(t('annualAverage'));

        const accountsData = {
            labels: accountsLabels,
            datasets: [
                {
                    label: t('createdAccounts'),
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    data: accountsDataRaw
                }
            ]
        };

        const accountsOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
        setPieChartData(pieData);
        setPieChartOptions(pieOptions);
        setAccountsChartData(accountsData);
        setAccountsChartOptions(accountsOptions);
    }, [t]);

    return (
        <div className={style.adminHome}>
            <div className={style.activeAds}>
                <h2>{t('annualReport')}</h2>
            </div>
            <div className={`card ${style.chartCard}`}>
                <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
            <div className={style.pieChartContainer}>
                <h2>{t('monthlyReport')}</h2>
                <div className={`card ${style.chartCard}`}>
                    <Chart type="pie" data={pieChartData} options={pieChartOptions} />
                </div>
            </div>
            <div className={style.accountsChartContainer}>
                <h2>{t('accountsCreated')}</h2>
                <div className={`card ${style.chartCard}`}>
                    <Chart type="bar" data={accountsChartData} options={accountsChartOptions} />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

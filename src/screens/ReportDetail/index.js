import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import styles from './styles'

import { Text, TextInput, Modal, Portal, Provider } from 'react-native-paper'
import CalendarPicker from 'react-native-calendar-picker'
import moment from 'moment'
import { LineChart } from "react-native-chart-kit";

import ReportItemCard from '../../components/ReportItemCard'
import ReportGraphicCard from '../../components/ReportGraphicCard'
import dotFormatter from '../../utilities/dotFormatter'

import { useSelector } from 'react-redux'

export const LineChartComponent = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const weekOfMonth = [1, 8, 15, 22, 29]
  const weekOfDay = Math.ceil(moment(startDate).date() / 7)
  const dateTimeStart = weekOfMonth.filter((_, i) => {
    return i === (weekOfDay - 1)
  })[0]
  const dateTimeEnd = dateTimeStart + 6

  const dateDiff = moment(endDate).diff(startDate, 'days')
  console.log(dateDiff)

  const chartLabel = weekOfDay !== 5 ? [...Array(7)].map((_, i) => {
    const day = dateTimeStart + i
    return day.toString()
  }) : [...Array(3)].map((_, i) => {
    const day = dateTimeStart + i
    return day.toString()
  })

  return (
    <LineChart
      data={{
        labels: chartLabel,
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]
          }
        ]
      }}
      width={Dimensions.get("window").width - 66} // from react-native
      height={200}
      yAxisLabel=""
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "4",
          strokeWidth: "1",
          stroke: "#ffa726"
        },
        propsForLabels: {
          fontSize: 8
        }
      }}
      bezier
      style={{
        borderRadius: 16
      }}
    />
  )
}

const CalendarPickerComponent = ({ onDateChange, visibleCalendar, setVisibleCalendar, setDateRangeValue }) => {
  const onDismiss = () => setVisibleCalendar(false)

  return (
    <Provider>
      <Portal>
        <Modal visible={visibleCalendar} onDismiss={onDismiss} contentContainerStyle={styles.dateChooseContainer}>
          <CalendarPicker
            startFromMonday
            allowRangeSelection
            todayBackgroundColor='#f2e6ff'
            selectedDayColor='#7300e6'
            selectedDayTextColor='#FFFFFF'
            onDateChange={onDateChange}
          />
        </Modal>
      </Portal>
    </Provider>
  )
}

export default function ReportDetail({ route, navigation }) {
  const { dateTimeStart, dateTimeEnd } = route.params

  const [startDate, setStartDate] = useState(dateTimeStart)
  const [endDate, setEndDate] = useState(dateTimeEnd)
  const [dateRangeValue, setDateRangeValue] = useState(`${moment(dateTimeStart).format('DD-MM-YYYY')} s/d ${moment(dateTimeEnd).format('DD-MM-YYYY')}`)
  const [visibleCalendar, setVisibleCalendar] = useState(false)

  const { invoices } = useSelector(state => state.invoices)
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date)
    } else {
      setStartDate(date)
      setEndDate(date)
    }
  }

  const rangedDateInvoicesWithDone = invoices.filter(invoice =>
    invoice.status === 'done' &&
    moment(invoice.dateTimeCreated.toDate()).isBetween(moment(startDate), moment(endDate))
  )

  const rangedDateInvoicesAll = invoices.filter(invoice =>
    moment(invoice.dateTimeCreated.toDate()).isBetween(moment(startDate), moment(endDate))
  )

  const crossSales = rangedDateInvoicesWithDone.reduce((a, b) => a + b.finalTotal, 0)
  const netSales = rangedDateInvoicesWithDone.reduce((a, b) => a + b.capitalPriceTotal, 0)
  const averageSales = crossSales > 0 ? crossSales / rangedDateInvoicesWithDone.length : 0

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Report Detail'
    })
  }, [navigation])

  useEffect(() => {
    const startDateString = moment(startDate)
    const endDateString = moment(endDate)
    setDateRangeValue(`${startDateString.format('DD-MM-YYYY')} s/d ${endDateString.format('DD-MM-YYYY')}`)
  }, [startDate, endDate])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.title}>Select Date Range</Text>
          <TextInput
            editable={false}
            value={dateRangeValue}
            right={<TextInput.Icon name='calendar' onPress={() => { setVisibleCalendar(true) }} />}
          />
        </View>
        <ReportGraphicCard>
          <LineChartComponent
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </ReportGraphicCard>
        <ReportItemCard
          icon='shuffle'
          title='Cross Sales'
          rightText={'Rp. ' + dotFormatter(crossSales)}
        />
        <ReportItemCard
          icon='smile'
          title='Net Sales'
          rightText={'Rp. ' + dotFormatter(netSales)}
        />
        <ReportItemCard
          icon='clipboard'
          title='Transactions'
          rightText={rangedDateInvoicesAll.length.toString()}
        />
        <ReportItemCard
          icon='database'
          title='Average Sales'
          rightText={'Rp. ' + dotFormatter(averageSales)}
        />
      </ScrollView>
      <CalendarPickerComponent
        textStyle={styles.calendarText}
        onDateChange={onDateChange}
        visibleCalendar={visibleCalendar}
        setVisibleCalendar={setVisibleCalendar}
      />
    </View >
  )
}

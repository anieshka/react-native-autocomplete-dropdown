import { any } from 'bluebird';
import React, { memo, useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const ScrollViewListItem = memo(({ selected, highlight, title, style, onPress, numberOfLines = 2, enableInput }) => {
    
    const [selectedContainer, setSelectedContainer] = useState()
    const [selectedText, setSelectedText] = useState()

    const styles = StyleSheet.create({
      container: {
        padding: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        width: '100%',
        backgroundColor: 'white'
      },
      text: {
        color: '#333',
        fontSize: 16,
        flexGrow: 1,
        flexShrink: 0
      },
      selectedtContainerCls: {
        backgroundColor: '#47a4d8',
      },
      selectedtTextCls: {
        fontWeight: '700', 
        color: 'white' ,
      },
    })
    const titleParts = useMemo(() => {
    
    let titleHighlighted = ''
    let titleStart = title
    let titleEnd = ''


    if (typeof title === 'string' && title.length > 0 && highlight.length > 0) {
      const substrIndex = title.toLowerCase().indexOf(highlight.toLowerCase())
      if (substrIndex !== -1) {
        titleStart = title.slice(0, substrIndex)
        titleHighlighted = title.slice(substrIndex, substrIndex + highlight.length)
        titleEnd = title.slice(substrIndex + highlight.length)
      }
    }

    if(selected === title){
      setSelectedContainer(styles.selectedtContainerCls)
      setSelectedText(styles.selectedtTextCls)
    }

    return { titleHighlighted, titleStart, titleEnd }
  }, [title, highlight])

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, selectedContainer]}>
        <Text numberOfLines={numberOfLines}>
          <Text numberOfLines={1} style={{ ...styles.text, ...style }}>
            {titleParts.titleStart}
          </Text>
          <Text numberOfLines={1} style={[{ ...styles.text, ...style }, selectedText]}>
            {titleParts.titleHighlighted}
          </Text>
          <Text numberOfLines={1} style={{ ...styles.text, ...style }}>
            {titleParts.titleEnd}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
})

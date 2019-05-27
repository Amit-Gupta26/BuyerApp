import {
    Linking,
    Text
} from 'react-native';
import React, { Component } from 'react';

export default class HyperTextUtils {
    static myInstance = null;

    static getInstance() {
        if (HyperTextUtils.myInstance == null) {
            HyperTextUtils.myInstance = new HyperTextUtils();
        }

        return this.myInstance;
    }

    convertText(textString) {
        var content = []
        linkColor = '#0B2B80',
            linkSize = '11'

        links = textString.match(/<a[^>]*>[^<]*<\/a>/g)
        theText = textString
        urls = []
        indexOf = 0
        lastIndexOf = 0

        if (links !== null) {
            links.forEach((link, i) => {
                href = link.match(/href=["|'](.+)["|']/)
                text = link.match(/<a[^>]*>([^<]+)<\/a>/)

                urls[i] = (href === null ? '#' : href[1])
                linkToInsert = (
                    <Text
                        key={i}
                        onPress={() => (urls[i] === '#' ? console.log('empty url') : Linking.openURL(urls[i]))}
                        style={{
                            color: linkColor,
                            fontSize: parseInt(linkSize),
                            fontWeight: "bold",
                            textDecorationLine: 'underline'
                        }}>
                        {text === null ? '' : text[1]}
                    </Text>
                );

                indexOf = theText.indexOf(link.toString())
                lastIndexOf = indexOf + link.toString().length

                if (indexOf !== 0) {
                    content.push(theText.slice(0, indexOf))
                }
                content.push(linkToInsert)
                theText = theText.slice(lastIndexOf, theText.length)
            })
        }

        content.push(theText)
        return content
    };
}
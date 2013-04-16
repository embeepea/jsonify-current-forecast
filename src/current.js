function handleXML(xmlstring) {

    var xmldoc = $.parseXML(xmlstring),
        $xml = $(xmldoc),
        obj = {};

    $xml.find('data').each(function () {
        var $data = $(this);
        $data.children().each(function () {
            var $dataTags = $(this),
                dataTagName = this.tagName;
            if (!obj[dataTagName]) {
                obj[dataTagName] = {};
            }
            
            $dataTags.children().each(function () {
                var data = $(this);
                var tagName = this.tagName;
                
                if (dataTagName === 'location') {
                    obj[dataTagName][tagName] = data.text();
                } else {
                    if (!obj[dataTagName][tagName]) {
                        obj[dataTagName][tagName] = {};
                    }
                    
                    obj[dataTagName][tagName][data.text()] = {};
                }
            });
        });
    });

    return(obj);

} //end handleXML

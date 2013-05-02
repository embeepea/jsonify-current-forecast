describe("handleXML", function () {
    "use strict";

    describe("function definition", function () {

        it("should define a function named handleXML", function () {
            expect(typeof(handleXML)).toBe("function");
        });

    });

    describe("parsing from test file data/Avl_0411-0418.xml", function () {

        var loadingFinished = false,
            data,
            n;

        $.ajax({
            url : '../data/Avl_0411-0418.xml',
            dataType : 'text',
            success : function (response) {
                loadingFinished = true;
                data = response;
            }
        });

        beforeEach(function () {
            waitsFor(function() {
                if (loadingFinished) {
                    n = handleXML(data);
                }
                return loadingFinished;
            });
        });

        describe('handleXML', function () {
            it('should store the location', function () {
                expect(n.location['city']).toEqual('Asheville NC');
            });

            it('should store the coordinates', function () {
                expect(n.location['latitude']).toEqual(35.59);
                expect(n.location['longitude']).toEqual(-82.57);
            });

            it('should store the element', function () {
                expect(n.temperature).toEqual(jasmine.any(Object));
            });

            it('should store existing element types', function () {
                expect(n.temperature['hourly']).toEqual(jasmine.any(Object));
            });

            it('should store the year', function () {
                expect(n.temperature['hourly'][2013]).toEqual(jasmine.any(Array));
            });

            it('should store the month', function () {
                expect(n.temperature['hourly'][2013][3]).toEqual(jasmine.any(Array));
            });

            it('should store the day', function () {
                expect(n.temperature['hourly'][2013][3][10]).toEqual(jasmine.any(Array)); 
                expect(n.temperature['hourly'][2013][3][11]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][3][12]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][3][13]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][3][14]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][3][15]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][3][16]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][3][17]).toEqual(jasmine.any(Array));
            });

            it('should store the hour', function () {
                expect(n.temperature['hourly'][2013][3][10][12]).toBeDefined();
                expect(n.temperature['hourly'][2013][3][11][17]).toBeDefined();
                expect(n.temperature['hourly'][2013][3][12][8]).toBeDefined();
                expect(n.temperature['hourly'][2013][3][13][22]).toBeDefined();
                expect(n.temperature['hourly'][2013][3][14][23]).toBeDefined();
                expect(n.temperature['hourly'][2013][3][15][9]).toBeDefined();
                expect(n.temperature['hourly'][2013][3][16][0]).toBeDefined();
                expect(n.temperature['hourly'][2013][3][17][8]).toBeDefined();
            });

            it('should store non-existing values as undefined in the array of hours', function () {
                expect(n.temperature['hourly'][2013][3][10][0]).toBeUndefined();
                expect(n.temperature['dew point'][2013][3][10][1]).toBeUndefined();
                expect(n.temperature['wind chill'][2013][3][10][2]).toBeUndefined();
                expect(n['probability-of-precipitation']['floating'][2013][3][10][3]).toBeUndefined();
                expect(n['wind-speed']['sustained'][2013][3][10][4]).toBeUndefined();
                expect(n['wind-speed']['gust'][2013][3][10][4]).toBeUndefined();
                expect(n.direction['wind'][2013][3][10][5]).toBeUndefined();
                expect(n['cloud-amount']['total'][2013][3][10][6]).toBeUndefined();
                expect(n.humidity['relative'][2013][3][10][7]).toBeUndefined();
                expect(n['hourly-qpf']['floating'][2013][3][10][8]).toBeUndefined();
                expect(n.weather[2013][3][10][9]).toBeUndefined();
            });

            it('should store existing temperature values', function () {
                expect(n.temperature['hourly'][2013][3][10][12]).toEqual(68);
                expect(n.temperature['hourly'][2013][3][11][17]).toEqual(68);
                expect(n.temperature['hourly'][2013][3][12][2]).toEqual(46);
                expect(n.temperature['hourly'][2013][3][13][19]).toEqual(69);
                expect(n.temperature['hourly'][2013][3][14][23]).toEqual(62);
                expect(n.temperature['hourly'][2013][3][15][6]).toEqual(53);
                expect(n.temperature['hourly'][2013][3][16][8]).toEqual(54);
                expect(n.temperature['hourly'][2013][3][17][11]).not.toBeDefined();

                expect(n.temperature['dew point'][2013][3][10][12]).toEqual(54);
                expect(n.temperature['dew point'][2013][3][11][17]).toEqual(42);
                expect(n.temperature['dew point'][2013][3][12][2]).toEqual(38);
                expect(n.temperature['dew point'][2013][3][13][19]).toEqual(44);
                expect(n.temperature['dew point'][2013][3][14][23]).toEqual(53);
                expect(n.temperature['dew point'][2013][3][15][6]).toEqual(53);
                expect(n.temperature['dew point'][2013][3][16][8]).toEqual(54);
                expect(n.temperature['dew point'][2013][3][17][11]).not.toBeDefined();

                expect(n.temperature['wind chill'][2013][3][10][12]).not.toBeDefined();
                expect(n.temperature['wind chill'][2013][3][11][17]).not.toBeDefined();
                expect(n.temperature['wind chill'][2013][3][12][2]).toEqual(42);
                expect(n.temperature['wind chill'][2013][3][13][5]).toEqual(40);
                expect(n.temperature['wind chill'][2013][3][14][23]).not.toBeDefined();
                expect(n.temperature['wind chill'][2013][3][15][6]).not.toBeDefined();
                expect(n.temperature['wind chill'][2013][3][16][8]).not.toBeDefined();
                expect(n.temperature['wind chill'][2013][3][17][11]).not.toBeDefined();
            });

            it('should store existing probability-of-precipitation values', function () {
                expect(n['probability-of-precipitation']['floating'][2013][3][10][12]).toEqual(5);
                expect(n['probability-of-precipitation']['floating'][2013][3][11][17]).toEqual(7);
                expect(n['probability-of-precipitation']['floating'][2013][3][12][2]).toEqual(7);
                expect(n['probability-of-precipitation']['floating'][2013][3][13][19]).toEqual(14);
                expect(n['probability-of-precipitation']['floating'][2013][3][14][23]).toEqual(30);
                expect(n['probability-of-precipitation']['floating'][2013][3][15][6]).toEqual(26);
                expect(n['probability-of-precipitation']['floating'][2013][3][16][8]).toEqual(23);
                expect(n['probability-of-precipitation']['floating'][2013][3][17][11]).not.toBeDefined();
            });

            it('should store existing wind speed values', function () {
                expect(n['wind-speed']['sustained'][2013][3][10][12]).toEqual(14);
                expect(n['wind-speed']['sustained'][2013][3][11][17]).toEqual(15);
                expect(n['wind-speed']['sustained'][2013][3][12][2]).toEqual(9);
                expect(n['wind-speed']['sustained'][2013][3][13][19]).toEqual(8);
                expect(n['wind-speed']['sustained'][2013][3][14][23]).toEqual(6);
                expect(n['wind-speed']['sustained'][2013][3][15][6]).toEqual(2);
                expect(n['wind-speed']['sustained'][2013][3][16][8]).toEqual(2);
                expect(n['wind-speed']['sustained'][2013][3][17][11]).not.toBeDefined();

                expect(n['wind-speed']['gust'][2013][3][10][12]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][3][11][17]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][3][12][2]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][3][13][19]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][3][14][23]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][3][15][6]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][3][16][8]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][3][17][11]).not.toBeDefined();
            });

            it('should store existing wind direction values', function () {
                expect(n.direction['wind'][2013][3][10][12]).toEqual(190);
                expect(n.direction['wind'][2013][3][11][17]).toEqual(290);
                expect(n.direction['wind'][2013][3][12][2]).toEqual(320);
                expect(n.direction['wind'][2013][3][13][19]).toEqual(160);
                expect(n.direction['wind'][2013][3][14][23]).toEqual(170);
                expect(n.direction['wind'][2013][3][15][6]).toEqual(180);
                expect(n.direction['wind'][2013][3][16][8]).toEqual(240);
                expect(n.direction['wind'][2013][3][17][11]).not.toBeDefined();
            });

            it('should store existing cloud-amount values', function () {
                expect(n['cloud-amount']['total'][2013][3][10][12]).toEqual(62);
                expect(n['cloud-amount']['total'][2013][3][11][17]).toEqual(18);
                expect(n['cloud-amount']['total'][2013][3][12][2]).toEqual(21);
                expect(n['cloud-amount']['total'][2013][3][13][19]).toEqual(56);
                expect(n['cloud-amount']['total'][2013][3][14][23]).toEqual(67);
                expect(n['cloud-amount']['total'][2013][3][15][6]).toEqual(65);
                expect(n['cloud-amount']['total'][2013][3][16][8]).toEqual(66);
                expect(n['cloud-amount']['total'][2013][3][17][11]).not.toBeDefined();
            });

            it('should store existing relative humidity values', function () {
                expect(n.humidity['relative'][2013][3][10][12]).toEqual(61);
                expect(n.humidity['relative'][2013][3][11][17]).toEqual(39);
                expect(n.humidity['relative'][2013][3][12][2]).toEqual(73);
                expect(n.humidity['relative'][2013][3][13][19]).toEqual(40);
                expect(n.humidity['relative'][2013][3][14][23]).toEqual(72);
                expect(n.humidity['relative'][2013][3][15][6]).toEqual(100);
                expect(n.humidity['relative'][2013][3][16][8]).toEqual(100);
                expect(n.humidity['relative'][2013][3][17][11]).not.toBeDefined();
            });

            it('should store existing hourly-qpf values', function () {
                expect(n['hourly-qpf']['floating'][2013][3][10][12]).toEqual(0);
                expect(n['hourly-qpf']['floating'][2013][3][11][8]).toEqual(0.0800);
                expect(n['hourly-qpf']['floating'][2013][3][12][2]).toEqual(0);
                expect(n['hourly-qpf']['floating'][2013][3][13][19]).toEqual(0);
                expect(n['hourly-qpf']['floating'][2013][3][14][20]).toEqual(0.0033);
                expect(n['hourly-qpf']['floating'][2013][3][15][9]).toEqual(0.0017);
                expect(n['hourly-qpf']['floating'][2013][3][16][8]).toEqual(0);
                expect(n['hourly-qpf']['floating'][2013][3][17][11]).not.toBeDefined();
            });

            it('should store existing weather conditions as an object', function () {
                expect(n.weather[2013][3][10][12]).not.toEqual(jasmine.any(Object));
                expect(n.weather[2013][3][11][13]).toEqual(jasmine.any(Object));
                expect(n.weather[2013][3][12][5]).not.toEqual(jasmine.any(Object));
                expect(n.weather[2013][3][13][22]).toEqual(jasmine.any(Object));
                expect(n.weather[2013][3][14][17]).toEqual(jasmine.any(Object));
                expect(n.weather[2013][3][15][0]).toEqual(jasmine.any(Object));
                expect(n.weather[2013][3][16][13]).toEqual(jasmine.any(Object));
                expect(n.weather[2013][3][17][9]).not.toEqual(jasmine.any(Object));
            });

            it('should store existing weather type and coverage', function () {
                expect(n.weather[2013][3][10][15]['rain']).toEqual('slight chance');
                expect(n.weather[2013][3][10][17]['rain']).toEqual('chance');
                expect(n.weather[2013][3][10][17]['thunderstorms']).toEqual('slight chance');
                expect(n.weather[2013][3][12][2]).not.toBeDefined();
                expect(n.weather[2013][3][13][21]['rain']).toEqual('slight chance');
                expect(n.weather[2013][3][14][23]['rain']).toEqual('chance');
                expect(n.weather[2013][3][15][12]['thunderstorms']).toEqual('slight chance');
                expect(n.weather[2013][3][15][12]['rain']).toEqual('chance');
                expect(n.weather[2013][3][16][8]['rain']).toEqual('slight chance');
                expect(n.weather[2013][3][17][11]).not.toBeDefined();
            });
        });
    });

    describe("parsing from test file data/Seattle_0430-0507.xml", function () {

        var loadingFinished = false,
            data,
            n;

        $.ajax({
            url : '../data/Seattle_0430-0507.xml',
            dataType : 'text',
            success : function (response) {
                loadingFinished = true;
                data = response;
            }
        });

        beforeEach(function () {
            waitsFor(function() {
                if (loadingFinished) {
                    n = handleXML(data);
                }
                return loadingFinished;
            });
        });

        describe('handleXML', function () {
            it('should store the location', function () {
                expect(n.location['city']).toEqual('Downtown Seattle WA');
            });

            it('should store the coordinates', function () {
                expect(n.location['latitude']).toEqual(47.6);
                expect(n.location['longitude']).toEqual(-122.32);
            });

            it('should store the element', function () {
                expect(n.temperature).toEqual(jasmine.any(Object));
            });

            it('should store existing element types', function () {
                expect(n.temperature['hourly']).toEqual(jasmine.any(Object));
            });

            it('should store the year', function () {
                expect(n.temperature['hourly'][2013]).toEqual(jasmine.any(Array));
            });

            it('should store the month', function () {
                expect(n.temperature['hourly'][2013][3]).toEqual(jasmine.any(Array));
            });

            it('should store the day', function () {
                expect(n.temperature['hourly'][2013][3][29]).toEqual(jasmine.any(Array)); 
                expect(n.temperature['hourly'][2013][4][0]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][4][1]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][4][2]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][4][3]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][4][4]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][4][5]).toEqual(jasmine.any(Array));
                expect(n.temperature['hourly'][2013][4][6]).toEqual(jasmine.any(Array));
            });

            it('should store the hour', function () {
                expect(n.temperature['hourly'][2013][3][29][10]).toBeDefined();
                expect(n.temperature['hourly'][2013][4][0][0]).toBeDefined();
                expect(n.temperature['hourly'][2013][4][1][5]).toBeDefined();
                expect(n.temperature['hourly'][2013][4][2][10]).toBeDefined();
                expect(n.temperature['hourly'][2013][4][3][15]).toBeDefined();
                expect(n.temperature['hourly'][2013][4][4][20]).toBeDefined();
                expect(n.temperature['hourly'][2013][4][5][22]).toBeDefined();
                expect(n.temperature['hourly'][2013][4][6][9]).toBeDefined();
            });

            it('should store non-existing values as undefined in the array of hours', function () {
                expect(n.temperature['wind chill'][2013][3][29][10]).toBeUndefined();
                expect(n['wind-speed']['gust'][2013][3][29][10]).toBeUndefined();
                expect(n.weather[2013][3][29][12]).toBeUndefined();
            });

            it('should store existing temperature values', function () {
                expect(n.temperature['hourly'][2013][3][29][10]).toEqual(42);
                expect(n.temperature['hourly'][2013][4][6][9]).toEqual(51);

                expect(n.temperature['dew point'][2013][3][29][10]).toEqual(33);
                expect(n.temperature['dew point'][2013][4][6][9]).toEqual(41);

                expect(n.temperature['wind chill'][2013][3][29][10]).not.toBeDefined();
                expect(n.temperature['wind chill'][2013][4][6][9]).not.toBeDefined();
            });

            it('should store existing probability-of-precipitation values', function () {
                expect(n['probability-of-precipitation']['floating'][2013][3][29][10]).toEqual(15);
                expect(n['probability-of-precipitation']['floating'][2013][4][6][9]).toEqual(9);
            });

            it('should store existing wind speed values', function () {
                expect(n['wind-speed']['sustained'][2013][3][29][10]).toEqual(3);
                expect(n['wind-speed']['sustained'][2013][4][6][9]).toEqual(3);

                expect(n['wind-speed']['gust'][2013][3][29][10]).not.toBeDefined();
                expect(n['wind-speed']['gust'][2013][4][6][9]).not.toBeDefined();
            });

            it('should store existing wind direction values', function () {
                expect(n.direction['wind'][2013][3][29][10]).toEqual(140);
                expect(n.direction['wind'][2013][4][6][9]).toEqual(280);
            });

            it('should store existing cloud-amount values', function () {
                expect(n['cloud-amount']['total'][2013][3][29][10]).toEqual(70);
                expect(n['cloud-amount']['total'][2013][4][6][9]).toEqual(20);
            });

            it('should store existing relative humidity values', function () {
                expect(n.humidity['relative'][2013][3][29][10]).toEqual(72);
                expect(n.humidity['relative'][2013][4][6][9]).toEqual(69);
            });

            it('should store existing hourly-qpf values', function () {
                expect(n['hourly-qpf']['floating'][2013][3][29][10]).toEqual(0.0017);
                expect(n['hourly-qpf']['floating'][2013][4][6][9]).toEqual(0);
            });

            it('should store existing weather conditions as an object', function () {
                expect(n.weather[2013][3][29][10]).toEqual(jasmine.any(Object));
                expect(n.weather[2013][4][6][9]).not.toEqual(jasmine.any(Object));
            });

            it('should store existing weather type and coverage', function () {
                expect(n.weather[2013][3][29][10]['rain']).toEqual('chance');
                expect(n.weather[2013][3][29][11]['rain']).toEqual('chance');
            });
        });
    });
});

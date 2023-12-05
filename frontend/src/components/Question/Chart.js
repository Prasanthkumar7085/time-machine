import classNames from "classnames";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useResizeObserver from "use-resize-observer";

// *********************************************************************
// Data.date must be provided in ASC order (ascending, oldest to newest)
// *********************************************************************
const LineChart = ({
  Data,
  updateChartData,
  chartRef,
  answers,
  hasResult,
  hasEstimate,
}) => {
  // Element References
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  const { width, height } = useResizeObserver({
    box: "border-box",
    ref: chartRef,
  });
  useEffect(() => {
    const hasEstimate =
      Data[Data.length - 2] && Data[Data.length - 2].value !== null;
    // D3 Code

    // data_type variables switch
    let xAccessor;
    let yAccessor;
    let yAxisLabel;
    let parseDate;

    // variable accessor depending on datatype
    parseDate = d3.timeParse("%Y");
    xAccessor = (d) => {
      if ("year" in d) {
        return parseDate(d.year);
      }
      return parseDate(d.date);
    };
    yAccessor = (d, i) => {
      if ("guessCenter" in d) {
        return Number(d.guessCenter);
      }
      return Number(d.value);
    };
    yAxisLabel = Data[0].yLabel;

    // Dimensions
    let dimensions = {
      width: width - 50, // width from state
      height: Math.min(height, 550), // height from state
      margins: 60,
      predictionMargin: 50,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // Selections
    const svg = d3
      .select(svgRef.current)
      .classed("line-chart-svg", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    // clear all previous content on refresh
    const everything = svg.selectAll("*");
    everything.remove();

    const container = svg
      .append("g")
      .classed("container", true)
      .attr(
        "transform",
        `translate(${dimensions.margins}, ${dimensions.margins})`,
      );

    const tooltip = d3.select(tooltipRef.current);
    const tooltipDot = container
      .append("circle")
      .classed("tool-tip-dot", true)
      .attr("r", 10)
      .attr("fill", "#F3AA60")
      .attr("stroke", "#252a33")
      .attr("stroke-width", 4)
      .style("opacity", 0)
      .style("pointer-events", "none");

    const y_extent = d3.extent(Data, yAccessor);
    const y_extent_diff = 0.4 * Math.abs(y_extent[1] - y_extent[0]);

    // Scales
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Data, yAccessor) + y_extent_diff])
      .range([dimensions.containerHeight, 0])
      .nice();
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(Data, xAccessor))
      .range([0, dimensions.containerWidth]);

    const dateDistance =
      xScale(xAccessor(Data[Data.length - 1])) -
      xScale(xAccessor(Data[Data.length - 2]));

    // Line Generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    // Draw Line
    container
      .append("path")
      .datum(hasEstimate ? Data.slice(0, -1) : Data.slice(0, -2))
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#468B97")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,15")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round");

    // Add the points
    const dataDots = container
      .append("g")
      .selectAll("dot")
      .data(hasEstimate ? Data.slice(0, -1) : Data.slice(0, -2))
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(xAccessor(d));
      })
      .attr("cy", function (d) {
        return yScale(yAccessor(d));
      })
      .attr("r", 5)
      .attr("fill", "#69b3a2")
      .transition();

    dataDots
      .filter(function (d, i, list) {
        return i === list.length - 1 && hasResult;
      })
      .transition()
      .delay(function (d, i) {
        return i * 150;
      })
      .on("start", function repeat(d, i) {
        d3.active(this)
          .style("fill", "#69b3a2")
          .transition()
          .style("fill", "#191D24")
          .transition()
          .on("start", repeat);
      });

    container
      .append("path")
      .datum(answers)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#A8DF8E")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,15")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round");

    const answerDots = container
      .append("g")
      .selectAll("answer-dot")
      .data(answers)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(xAccessor(d));
      })
      .attr("cy", function (d) {
        return yScale(yAccessor(d));
      })
      .attr("r", 5)
      .attr("fill", "#A8DF8E")
      .transition();

    answerDots
      .filter(function (d, i, list) {
        return i === list.length - 1 && hasResult;
      })
      .transition()
      .delay(function (d, i) {
        return i * 150;
      })
      .on("start", function repeat(d, i) {
        d3.active(this)
          .style("fill", "#A8DF8E")
          .transition()
          .style("fill", "#191D24")
          .transition()
          .on("start", repeat);
      });

    // Axis
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);

    const yAxisGroup = container
      .append("g")
      .classed("yAxis", true)
      .style("color", "white")
      .style("font-size", "1.1rem")
      .call(yAxis);

    // y-axis label
    yAxisGroup
      .append("text")
      .attr("x", -dimensions.containerHeight / 2)
      .attr("y", -dimensions.margins + 15)
      .attr("fill", "white")
      .text(yAxisLabel)
      .style("font-size", "1.1rem")
      .style("transform", "rotate(270deg)")
      .style("text-anchor", "middle");

    const xAxis = d3
      .axisBottom(xScale)
      .tickSizeOuter(0)
      .tickValues(Data.slice(0, -1).map((d) => xAccessor(d)));

    const xAxisGroup = container
      .append("g")
      .classed("xAxis", true)
      .style("transform", `translateY(${dimensions.containerHeight}px)`)
      .style("color", "white")
      .style("font-size", "1.1rem")
      .call(xAxis);

    xAxisGroup
      .append("text")
      .attr("x", dimensions.containerWidth / 2)
      .attr("y", 50)
      .attr("fill", "white")
      .text("Year")
      .style("font-size", "1.1rem")
      .style("text-anchor", "middle");

    var verticalx = d3
      .select(".xindicator")
      .style("width", "1px")
      .style("height", dimensions.height - 2 * dimensions.margins + "px")
      .style("top", dimensions.margins + "px")
      .style("opacity", 0);

    var verticaly = d3
      .select(".yindicator")
      .style("width", dimensions.width - 2 * dimensions.margins + "px")
      .style("height", "1px")
      .style("left", dimensions.margins + "px")
      .style("opacity", 0);

    // var verticalXPointer = d3
    //   .select(".xpindicator")
    //   .style("width", "1px")
    //   .style("height", dimensions.height - 2 * dimensions.margins + "px")
    //   .style("top", dimensions.margins + "px");

    var verticalYPointer = d3
      .select(".ypindicator")
      .style("width", dimensions.width - 2 * dimensions.margins + "px")
      .style("height", "1px")
      .style("left", dimensions.margins + "px")
      .style("opacity", 0);

    var verticalYPointerUp = d3
      .select(".ypindicatorupband")
      .style(
        "width",
        dimensions.containerWidth - dimensions.predictionMargin + "px",
      )
      .style("height", "1px")
      .style("left", dimensions.margins + "px")
      .style(
        "top",
        hasEstimate
          ? yScale(
              yAccessor(Data[Data.length - 2]) +
                Data[Data.length - 2].estimateMargin,
            ) +
              dimensions.margins -
              1 +
              "px"
          : undefined,
      )
      .style("opacity", hasEstimate ? 1 : 0);

    var verticalYPointerDown = d3
      .select(".ypindicatordownband")
      .style(
        "width",
        dimensions.containerWidth - dimensions.predictionMargin + "px",
      )
      .style("height", "1px")
      .style("left", dimensions.margins + "px")
      .style(
        "top",
        hasEstimate
          ? yScale(
              yAccessor(Data[Data.length - 2]) -
                Data[Data.length - 2].estimateMargin,
            ) +
              dimensions.margins -
              1 +
              "px"
          : undefined,
      )
      .style("opacity", hasEstimate ? 1 : 0);
    var verticalYPointerMid = d3
      .select(".ypindicatormidband")
      .style(
        "width",
        dimensions.containerWidth - dimensions.predictionMargin + "px",
      )
      .style("height", "1px")
      .style("left", dimensions.margins + "px")
      .style(
        "top",
        hasEstimate
          ? yScale(yAccessor(Data[Data.length - 2])) + dimensions.margins + "px"
          : undefined,
      )
      .style("opacity", hasEstimate ? 1 : 0);

    var estimateZone = container
      .append("rect")
      .attr("width", dateDistance)
      .attr("height", dimensions.containerHeight)
      .attr("fill", "transparent")
      .attr("stroke", "#EF6262")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("rx", "2px")
      .attr("ry", "2px")
      .attr("x", dimensions.containerWidth - 1.5 * dateDistance)
      .attr("y", 0);

    var estimateText = container
      .append("text")
      .attr("x", -dimensions.containerHeight / 2)
      .attr("y", dimensions.containerWidth)
      .attr("fill", "#EF6262")
      .text("Estimation Zone")
      .style("font-size", "1rem")
      .style("transform", "rotate(270deg)")
      .style("text-anchor", "middle");

    const estimateMarginY =
      yScale(yAccessor(Data[0])) -
      yScale(yAccessor(Data[0]) + Data[Data.length - 2].estimateMargin);

    var rect = container
      .append("rect")
      .attr("x", dimensions.containerWidth - 1.5 * dateDistance + 5)
      .attr("y", yScale(yAccessor(Data[Data.length - 2])) - estimateMarginY)
      .attr("width", dateDistance - 10)
      .attr("height", 2 * estimateMarginY)
      .attr("fill", "rgba(239,98,98,.5)")
      .attr("stroke", "rgba(239,98,98,1)")
      .attr("storke-width", 2)
      .attr("rx", "2px")
      .attr("ry", "2px")
      .style("opacity", hasEstimate ? 1 : 0);

    var rectLine = container
      .append("rect")
      .attr("x", dimensions.containerWidth - 1.5 * dateDistance + 5)
      .attr("y", hasEstimate ? yScale(yAccessor(Data[Data.length - 2])) : 0)
      .attr("width", dateDistance - 10)
      .attr("height", 2)
      .attr("fill", "#EF6262")
      .style("opacity", hasEstimate ? 1 : 0);

    var answerRect = container
      .selectAll("answer-rect")
      .data(answers)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return xScale(xAccessor(d)) - 0.5 * dateDistance + 15;
      })
      .attr("y", function (d) {
        return yScale(yAccessor(d) + d.guessRange);
      })
      .attr("width", dateDistance - 30)
      .attr("height", function (d) {
        const estimateMargin =
          yScale(yAccessor(d)) - yScale(yAccessor(d) + d.guessRange);
        return 2 * estimateMargin;
      })
      .attr("fill", function (d) {
        if (d.confidentBandAccuracy !== 0) {
          return "rgba(158,179,132,.2)";
        }
        return "rgba(239,98,98,.2)";
      })
      .attr("stroke", function (d) {
        if (d.confidentBandAccuracy !== 0) {
          return "rgba(158,179,132,.5)";
        }
        return "rgba(239,98,98,.5)";
      })
      .attr("storke-width", 2)
      .attr("rx", "2px")
      .attr("ry", "2px");

    let [x, y] = [0, 0];

    // Tooltip
    container
      .append("rect")
      .classed("mouse-tracker", true)
      .attr("width", dimensions.containerWidth)
      .attr("height", dimensions.containerHeight)
      .style("z-index", 100000)
      .style("opacity", 0)
      .on("mousemove", function (event) {
        const dataPoints = hasEstimate ? Data.slice(0, -1) : Data.slice(0, -2);
        const mousePos = d3.pointer(event, this);

        // verticalXPointer
        //   .style("left", mousePos[0] + dimensions.margins - 3 + "px")
        //   .style(
        //     "height",
        //     dimensions.height - 2 * dimensions.margins - mousePos[1] + "px"
        //   )
        //   .style("top", mousePos[1] + dimensions.margins - 3 + "px");

        verticalYPointer
          .style("top", mousePos[1] + dimensions.margins + "px")
          .style("left", dimensions.margins + "px")
          .style("width", mousePos[0] - 5 + "px")
          .style("opacity", 1);

        // x coordinate stored in mousePos index 0
        const date = xScale.invert(mousePos[0]);

        // Custom Bisector - left, center, right
        const dateBisector = d3.bisector(xAccessor).center;

        const bisectionIndex = dateBisector(dataPoints, date);
        //console.log(bisectionIndex);
        // math.max prevents negative index reference error
        const hoveredIndexData = dataPoints[Math.max(0, bisectionIndex)];

        verticalx
          .style(
            "left",
            xScale(xAccessor(hoveredIndexData)) + dimensions.margins + "px",
          )
          .style(
            "height",
            dimensions.height -
              2 * dimensions.margins -
              yScale(yAccessor(hoveredIndexData)) +
              "px",
          )
          .style(
            "top",
            yScale(yAccessor(hoveredIndexData)) + dimensions.margins + "px",
          )
          .style("opacity", 1);

        verticaly
          .style(
            "top",
            yScale(yAccessor(hoveredIndexData)) + dimensions.margins + "px",
          )
          .style("left", dimensions.margins + "px")
          .style("width", xScale(xAccessor(hoveredIndexData)) + "px")
          .style("opacity", 1);

        // Update Image
        tooltipDot
          .style("opacity", 1)
          .attr("cx", xScale(xAccessor(hoveredIndexData)))
          .attr("cy", yScale(yAccessor(hoveredIndexData)))
          .raise();

        tooltip
          .style("display", "block")
          .style("top", `${dimensions.height}px`)
          .style("left", `${xScale(xAccessor(hoveredIndexData))}px`)
          .style("color", "white");

        tooltip.select(".data").text(`value: ${yAccessor(hoveredIndexData)}`);

        const dateFormatter = d3.timeFormat("year: %Y");

        tooltip
          .select(".date")
          .text(`${dateFormatter(xAccessor(hoveredIndexData))}`);
      })
      .on("mouseleave", function () {
        tooltipDot.style("opacity", 0);
        tooltip.style("display", "none");
        verticalx.style("opacity", 0);
        verticaly.style("opacity", 0);
        verticalYPointer.style("opacity", 0);
      })
      .call(
        d3
          .drag()
          .on("start", function (event) {
            if (event.x < dimensions.containerWidth - 1.5 * dateDistance) {
              return;
            }
            x = event.x;
            y = event.y;

            // dot
            //   .attr("cx", event.x)
            //   .attr("cy", event.y)
            //   .attr("r", 5)
            //   .attr("fill", "rgba(239,98,98,.5)")
            //   .attr("stroke", "rgba(239,98,98,1)")
            //   .attr("storke-width", 2);
            // centerDot.attr("cx", event.x).attr("cy", event.y);
            rect
              .attr("x", dimensions.containerWidth - 1.5 * dateDistance + 5)
              .attr("y", event.y)
              .attr("width", dateDistance - 10)
              .attr("height", 5)
              .attr("fill", "rgba(239,98,98,.5)")
              .attr("stroke", "rgba(239,98,98,1)")
              .attr("storke-width", 2)
              .style("opacity", 1);

            rectLine
              .attr("x", dimensions.containerWidth - 1.5 * dateDistance + 5)
              .attr("y", event.y)
              .attr("width", dateDistance - 10)
              .attr("height", 2)
              .style("opacity", 1);
          })
          .on("drag", function (event) {
            if (x === 0 || y === 0) return;
            var a = x - event.x;
            var b = y - event.y;

            var c = Math.sqrt(a * a + b * b);
            // dot
            //   .attr("cx", x)
            //   .attr("cy", y)
            //   .attr("r", c)
            //   .attr("fill", "rgba(239,98,98,.5)")
            //   .attr("stroke", "rgba(239,98,98,1)")
            //   .attr("storke-width", 2);

            if (y - c < 0 || y + c > dimensions.containerHeight) {
              const estimateMargin = Math.min(
                c,
                dimensions.containerHeight - y,
                dimensions.containerHeight - (dimensions.containerHeight - y),
              );
              updateChartData(
                yScale.invert(y),
                yAccessor(Data[0]) -
                  yScale.invert(yScale(yAccessor(Data[0])) + estimateMargin),
              );
              return;
            }

            verticalYPointerUp
              .style("top", y - c + dimensions.margins - 1 + "px")
              .style("left", dimensions.margins + "px")
              .style(
                "width",
                dimensions.containerWidth - dimensions.predictionMargin + "px",
              )
              .style("opacity", 1);

            verticalYPointerDown
              .style("top", y + c + dimensions.margins - 1 + "px")
              .style("left", dimensions.margins + "px")
              .style(
                "width",
                dimensions.containerWidth - dimensions.predictionMargin + "px",
              )
              .style("opacity", 1);

            verticalYPointerMid
              .style("top", y + dimensions.margins + "px")
              .style("left", dimensions.margins + "px")
              .style(
                "width",
                dimensions.containerWidth - dimensions.predictionMargin + "px",
              )
              .style("opacity", 1);

            rect
              .attr("y", y - c)
              .attr("height", 2 * c)
              .attr("fill", "rgba(239,98,98,.5)")
              .attr("stroke", "rgba(239,98,98,1)")
              .attr("storke-width", 2);
          })
          .on("end", function (event) {
            var a = x - event.x;
            var b = y - event.y;
            if (Math.abs(b) === 0) {
              toast.error("Please drag the line to set a range.");
              rectLine.style("opacity", 0);
              rect.style("opacity", 0);
              return;
            }

            var c = Math.sqrt(a * a + b * b);
            if (y - c < 0 || y + c > dimensions.containerHeight) return;
            updateChartData(
              yScale.invert(y),
              yAccessor(Data[0]) -
                yScale.invert(yScale(yAccessor(Data[0])) + c),
            );
          }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Data, width, height, hasEstimate, hasResult]); // redraw chart if data or dimensions change

  return (
    <div className="line-chart relative w-full">
      <div
        className={classNames(
          "absolute w-1 h-1 bg-transparent left-6 top-6 xindicator border-dashed border border-[rgba(255,255,255,.3)] z-0 opacity-0",
          hasResult ? "hidden opacity-0" : "visible",
        )}
      />
      <div
        className={classNames(
          "absolute w-1 h-1 bg-transparent left-6 top-6 yindicator border-dashed border border-[rgba(255,255,255,.3)] z-0 opacity-0",
          hasResult ? "hidden opacity-0" : "visible",
        )}
      />
      {/* <div className="absolute w-1 h-1 bg-transparent left-6 top-6 xpindicator border-dashed border border-[rgba(255,255,255,.3)] z-0" /> */}
      <div
        className={classNames(
          "absolute w-1 h-1 bg-transparent left-6 top-6 ypindicator border-dashed border border-[rgba(255,255,255,.3)] z-0 opacity-0",
          hasResult ? "hidden opacity-0" : "visible",
        )}
      />
      <div
        className={classNames(
          "absolute w-1 h-1 bg-transparent left-6 top-6 ypindicatorupband border-dashed border border-[rgba(239,98,98,.3)] z-0 opacity-0",
          hasResult ? "hidden opacity-0" : "visible",
        )}
      />
      <div
        className={classNames(
          "absolute w-1 h-1 bg-transparent left-6 top-6 ypindicatordownband border-dashed border border-[rgba(239,98,98,.3)] z-0 opacity-0",
          hasResult ? "hidden opacity-0" : "visible",
        )}
      />
      <div
        className={classNames(
          "absolute w-1 h-1 bg-transparent left-6 top-6 ypindicatormidband border-dashed border border-[rgba(239,98,98,.5)] z-0 opacity-0",
          hasResult ? "hidden opacity-0" : "visible",
        )}
      />
      <svg ref={svgRef} />
      <div ref={tooltipRef} className="lc-tooltip absolute">
        <div className="data"></div>
        <div className="date"></div>
      </div>
    </div>
  );
};

export default LineChart;

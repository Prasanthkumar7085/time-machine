import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

// *********************************************************************
// Data.date must be provided in ASC order (ascending, oldest to newest)
// *********************************************************************
const LineChart = ({ Data, data_type }) => {
  // Element References
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const svgContainer = useRef(null); // The PARENT of the SVG

  // State to track width and height of SVG Container
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  // This function calculates width and height of the container
  const getSvgContainerSize = () => {
    const newWidth = svgContainer.current.clientWidth;
    setWidth(newWidth);

    const newHeight = Math.max(svgContainer.current.clientHeight, 350);
    setHeight(newHeight);
  };

  useEffect(() => {
    // detect 'width' and 'height' on render
    getSvgContainerSize();
    // listen for resize changes, and detect dimensions again when they change
    window.addEventListener("resize", getSvgContainerSize);
    // cleanup event listener
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, []);

  useEffect(() => {
    // D3 Code

    // data_type variables switch
    let xAccessor;
    let yAccessor;
    let yAxisLabel;
    let parseDate;

    // variable accessor depending on datatype
    switch (data_type) {
      case "test":
        parseDate = d3.timeParse("%Y-%m-%d");
        xAccessor = (d) => parseDate(d.date);
        yAccessor = (d) => d.Impressions;
        yAxisLabel = "Test Label";
        break;
      case "impressions":
        parseDate = d3.timeParse("%Y-%m-%d");
        xAccessor = (d) => parseDate(d.date);
        yAccessor = (d) => d.Impressions;
        yAxisLabel = "Impressions";
        break;
      default:
        throw new Error(`${data_type} is an unknown data_type prop`);
    }

    // Dimensions
    let dimensions = {
      width: width, // width from state
      height: height, // height from state
      margins: 50,
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
        `translate(${dimensions.margins}, ${dimensions.margins})`
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

    // Scales
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Data, yAccessor)])
      .range([dimensions.containerHeight, 0])
      .nice();
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(Data, xAccessor))
      .range([0, dimensions.containerWidth]);

    // Line Generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    // Draw Line
    container
      .append("path")
      .datum(Data)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "#468B97")
      .attr("stroke-width", 2);

    // Axis
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);

    const yAxisGroup = container
      .append("g")
      .classed("yAxis", true)
      .style("color", "white")
      .call(yAxis);

    // y-axis label
    yAxisGroup
      .append("text")
      .attr("x", -dimensions.containerHeight / 2)
      .attr("y", -dimensions.margins + 10)
      .attr("fill", "white")
      .text(yAxisLabel)
      .style("font-size", "1rem")
      .style("transform", "rotate(270deg)")
      .style("text-anchor", "middle");

    const xAxis = d3.axisBottom(xScale);

    container
      .append("g")
      .classed("xAxis", true)
      .style("transform", `translateY(${dimensions.containerHeight}px)`)
      .style("color", "white")
      .call(xAxis);

    var verticalx = d3
      .select(".xindicator")
      .style("width", "1px")
      .style("height", dimensions.height - 2 * dimensions.margins + "px")
      .style("top", dimensions.margins + "px");

    var verticaly = d3
      .select(".yindicator")
      .style("width", dimensions.width - 2 * dimensions.margins + "px")
      .style("height", "1px")
      .style("left", dimensions.margins + "px");

    // var dot = container.append("circle").attr("r", 5).attr("fill", "#EF6262");
    // var centerDot = container
    //   .append("circle")
    //   .attr("r", 2)
    //   .attr("fill", "#EF6262");
    var rect = container
      .append("rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("fill", "#EF6262")
      .attr("rx", "2px")
      .attr("ry", "2px")
      .style("opacity", 0);

    var rectLine = container
      .append("rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("fill", "#EF6262");

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
        const mousePos = d3.pointer(event, this);

        verticalx
          .style("left", mousePos[0] + dimensions.margins - 3 + "px")
          .style(
            "height",
            dimensions.height - 2 * dimensions.margins - mousePos[1] + "px"
          )
          .style("top", mousePos[1] + dimensions.margins - 3 + "px");

        verticaly
          .style("top", mousePos[1] + dimensions.margins - 3 + "px")
          .style("left", dimensions.margins + "px")
          .style("width", mousePos[0] + "px");

        // x coordinate stored in mousePos index 0
        const date = xScale.invert(mousePos[0]);

        // Custom Bisector - left, center, right
        const dateBisector = d3.bisector(xAccessor).center;

        const bisectionIndex = dateBisector(Data, date);
        //console.log(bisectionIndex);
        // math.max prevents negative index reference error
        const hoveredIndexData = Data[Math.max(0, bisectionIndex)];

        // Update Image
        tooltipDot
          .style("opacity", 1)
          .attr("cx", xScale(xAccessor(hoveredIndexData)))
          .attr("cy", yScale(yAccessor(hoveredIndexData)))
          .raise();

        tooltip
          .style("display", "block")
          .style("top", `${yScale(yAccessor(hoveredIndexData)) - 50}px`)
          .style("left", `${xScale(xAccessor(hoveredIndexData))}px`)
          .style("color", "white");

        tooltip.select(".data").text(`${yAccessor(hoveredIndexData)}`);

        const dateFormatter = d3.timeFormat("%B %-d, %Y");

        tooltip
          .select(".date")
          .text(`${dateFormatter(xAccessor(hoveredIndexData))}`);
      })
      .on("mouseleave", function () {
        tooltipDot.style("opacity", 0);
        tooltip.style("display", "none");
      })
      .call(
        d3
          .drag()
          .on("start", function (event) {
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
              .attr("x", event.x - 10)
              .attr("y", event.y)
              .attr("width", 20)
              .attr("height", 5)
              .attr("fill", "rgba(239,98,98,.5)")
              .attr("stroke", "rgba(239,98,98,1)")
              .attr("storke-width", 2)
              .style("opacity", 1);

            rectLine
              .attr("x", event.x - 10)
              .attr("y", event.y)
              .attr("width", 20)
              .attr("height", 2);
          })
          .on("drag", function (event) {
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

            rect
              .attr("y", y - c)
              .attr("height", 2 * c)
              .attr("fill", "rgba(239,98,98,.5)")
              .attr("stroke", "rgba(239,98,98,1)")
              .attr("storke-width", 2);
          })
      );
  }, [Data, data_type, width, height]); // redraw chart if data or dimensions change

  return (
    <div ref={svgContainer} className="line-chart relative">
      <svg ref={svgRef} />
      <div className="absolute w-1 h-1 bg-transparent left-6 top-6 xindicator border-dashed border border-white z-50" />
      <div className="absolute w-1 h-1 bg-transparent left-6 top-6 yindicator border-dashed border border-white z-50" />
      <div ref={tooltipRef} className="lc-tooltip">
        <div className="data"></div>
        <div className="date"></div>
      </div>
    </div>
  );
};

export default LineChart;

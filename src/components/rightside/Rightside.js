import React, { useEffect, useState } from "react";
import "./Rightside.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Table, Pagination } from "react-bootstrap";
import { AiFillAndroid, AiOutlineApple } from "react-icons/ai";

function Rightside() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [updata, setUpdata] = useState();
  const [tabledata, setTabledata] = useState();
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = 81;
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };

  const handleDateChange = (item) => {
    const startDate = item.selection.startDate;
    const endDate = item.selection.endDate;

    setSelectedDates([
      {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      },
    ]);
  };

  const handleOpenPicker = () => {
    setShowDateRangePicker(!showDateRangePicker);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=${selectedDates[0].startDate}&todate=${selectedDates[0].endDate}&page=${activePage}&limit=${limit}`
        );
        const data1 = await response1.json();
        setUpdata(data1);

        const response2 = await fetch(
          `https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${selectedDates[0].startDate}&todate=${selectedDates[0].endDate}&page=${activePage}&limit=${limit}`
        );
        const data2 = await response2.json();
        setTabledata(data2.data);

        console.log(data2);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [limit, activePage, selectedDates[0].startDate, selectedDates[0].endDate]);

  console.log(tabledata);

  // const ITEMS_PER_PAGE = 5;
  // const maxPages = Math.ceil(tabledata.data.length / ITEMS_PER_PAGE);

  const datestring = (getdate) => {
    const dateObj = new Date(getdate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 5;
    const middlePage = Math.floor(maxPages / 2);

    let startPage = activePage - middlePage;
    let endPage = activePage + middlePage;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => handleClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = Array.from(
    { length: itemsPerPage },
    (_, i) => startIndex + i
  );

  return (
    <div className="rightside">
      <div className="righttop">
        <div className="righttopcard">
          <img src="https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg" />
          <h3>{updata?.data?.totalInstall} App install</h3>
        </div>
        <div className="righttopcard">
          <img src="https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg" />
          <h3>{updata?.data?.activeinstall} activeinstall</h3>
        </div>
        <div className="righttopcard">
          <img src="https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg" />
          <h3>{updata?.data?.churn}% churn </h3>
        </div>
        <div className="righttopcard">
          <img src="https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg" />
          <h3>{updata?.data?.totaluninstall} totaluninstall</h3>
        </div>
        <div className="righttopcard">
          <img src="https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg" />
          <h3>{updata?.data?.aliveappusers} aliveappusers </h3>
        </div>
        <div className="righttopcard">
          <img src="https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg" />
          <h3>{updata?.data?.alivechurn} alivechurn</h3>
        </div>
      </div>

      <div className="rightsidebottom">
        <div className="bottomtop">
          <div className="bottomtopleft">
            <p>Show</p>
            <div class="dropdown">
              <p>{limit}</p>
              <div class="dropdown-content">
                <a onClick={() => setLimit(10)}>10</a>

                <a onClick={() => setLimit(50)}>50</a>

                <a onClick={() => setLimit(100)}>100</a>

                <a onClick={() => setLimit(500)}>500</a>

                <a onClick={() => setLimit(1000)}>1000</a>
              </div>
            </div>
          </div>
          <div className="datepicker">
            <button className="datebutton" onClick={handleOpenPicker}>
              Select Duration
            </button>
            {showDateRangePicker && (
              <div className="datepicker-popup">
                <DateRangePicker
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  showOneCalendar={true}
                  onChange={handleDateChange}
                  months={1}
                  ranges={selectedDates}
                  direction="horizontal"
                />
              </div>
            )}
          </div>
        </div>
        <div className="tabledata">
          <Table striped bordered hover>
            <thead className="threadtable">
              <tr>
                <th>Date</th>
                <th>Day install</th>
                <th>Platform</th>
                <th>Day Uninstall</th>
                <th>Churn rate</th>
                <th>Churn Platform</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {tabledata?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{datestring(item.created_At)}</td>
                  <td>{item.totalinstall}</td>
                  <td>
                    <div>
                      <div className="platform">
                        <AiOutlineApple size={20} />
                        {item.ios_uninstall}
                      </div>
                      <div className="platform">
                        <AiFillAndroid size={20} />
                        {item.android_install}
                      </div>
                    </div>
                  </td>
                  <td>{item.totaluninstall}</td>
                  <td>{item.totalchurn}%</td>
                  <td>
                    {" "}
                    <div>
                      <div className="platform">
                        <AiOutlineApple size={20} />
                        {item.ios_churn}%
                      </div>
                      <div className="platform">
                        <AiFillAndroid size={20} />
                        {item.android_churn}%
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagenumber">
            <Pagination>
              <Pagination.Prev
                disabled={activePage === 1}
                onClick={() => handleClick(activePage - 1)}
              />
              {renderPageNumbers()}
              <Pagination.Next
                disabled={activePage === totalPages}
                onClick={() => handleClick(activePage + 1)}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightside;

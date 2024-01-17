import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAuthDetails } from "store/selectors";
import { Col, Empty, Input, Row, Table, TableProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getDomainFromEmail, isCompanyEmail } from "utils/FormattingHelper";
import { isEmailVerified } from "utils/AuthUtils";
import { getFunctions, httpsCallable } from "firebase/functions";
import "./index.scss";

interface OrgMembersTableProps {
  actionButtons: (record: any) => ReactNode;
}

export const OrgMembersTable: React.FC<OrgMembersTableProps> = ({ actionButtons }) => {
  const user = useSelector(getUserAuthDetails);
  const [organizationMembers, setOrganizationMembers] = useState<{ total: number; users: unknown[] }>(null);
  const [search, setSearch] = useState("");
  const getOrganizationUsers = useMemo(() => httpsCallable(getFunctions(), "users-getOrganizationUsers"), []);

  const searchedMembers = useMemo(() => {
    if (!organizationMembers?.users) return [];
    return organizationMembers?.users?.filter((member: any) => {
      return member?.email?.includes(search) && member?.email !== user?.details?.profile?.email;
    });
  }, [organizationMembers?.users, search, user?.details?.profile?.email]);

  useEffect(() => {
    isEmailVerified(user?.details?.profile?.uid).then((result) => {
      if (result && isCompanyEmail(user?.details?.profile?.email)) {
        getOrganizationUsers({
          domain: getDomainFromEmail(user?.details?.profile?.email),
        }).then((res: any) => {
          setOrganizationMembers(res.data);
        });
      }
    });
  }, [getOrganizationUsers, user?.details?.profile?.email, user?.details?.profile?.uid]);

  const columns: TableProps<any>["columns"] = useMemo(
    () => [
      {
        title: "Member",
        key: "member",
        width: 350,
        render: (_: any, record: any) => {
          console.log(record?.photoURL, record?.email);
          return (
            <Row align="middle" gutter={8}>
              <Col>
                <img
                  className="org-member-avatar"
                  src={
                    record?.photoURL.length
                      ? record?.photoURL
                      : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  }
                  alt={record?.email}
                />
              </Col>
              <Col className="org-member-email">{record?.email}</Col>
            </Row>
          );
        },
        defaultSortOrder: "ascend",
        showSorterTooltip: false,
        sorter: {
          compare: (a: any, b: any) => a.email.localeCompare(b.email),
        },
      },
      {
        title: "",
        key: "action",
        render: (_: any, record: any) => {
          return actionButtons(record);
        },
      },
    ],

    [actionButtons]
  );

  return (
    <Col className="org-member-table">
      <Col className="org-member-table-header">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search members"
          className="org-member-table-header-input"
          suffix={<SearchOutlined />}
        />
      </Col>
      <Table
        className="billing-table"
        dataSource={searchedMembers}
        columns={columns}
        pagination={false}
        scroll={{ y: "70vh" }}
        loading={!organizationMembers?.users}
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No member found" />,
        }}
      />
    </Col>
  );
};

import Cards from "../../Commons/Cards";
import { getHotDesigner } from "../../../store/api";
import { useQuery } from "react-query";

export interface IHotDesigner {
  designer_seq: number;
  designerNickName: string;
  designerImgUrl: string;
  followerNum: number;
  nailartCount: number;
}

const HotDesignersContent = () => {
  const { isLoading: designerLoading, data: designerData } = useQuery(
    "hotDesigner",
    getHotDesigner
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {designerData &&
        designerData.slice(0, 4).map((item: any, idx: string) => (
          <div key={idx} style={{ margin: "10px 20px" }}>
            <Cards info={item} url="designerpage" />
          </div>
        ))}
    </div>
  );
};
export default HotDesignersContent;

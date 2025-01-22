import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

export default function ProductComment({ daynamicId }) {
  return (
    <div>
      <ReviewForm daynamicId={daynamicId} />
      <ReviewCard perenId={daynamicId} />
    </div>
  );
}

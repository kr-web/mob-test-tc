import { Route, Routes, useParams } from "react-router-dom";

// mob
import { MobMainLayout } from "./components/layoutsMob/layout/MobMainLayout.tsx";
import MobDashboardPage from "./mob/dashboard/pages/DashboardPage";
import MobTcListPage from "./mob/tcList/page/TcListPage";
import MobTrashPage from "./mob/tcTrash/page/TrashPage.tsx";
import MobSamplePage from "./mob/view/pages/SamplePage";
import MobViewPage from "./mob/view/pages/ViewPage";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { Loading } from "./components/common/loading/Loading.tsx";
import { useIsMobile } from "./hooks/useIsMobile.ts";

function MobSamplePageWrapper() {
  const { id } = useParams<{ id: string }>();
  const numId = id ? parseInt(id) : 1; // 기본 1
  return <MobSamplePage path={numId} />;
}

function App() {
  const isMobile = useIsMobile();

  return (
    <Routes>
      {isMobile ? (
        <>
          <Route element={<MobMainLayout />}>
            <Route path="/" element={<MobDashboardPage />} />
            <Route path="/tcList" element={<MobTcListPage />} />
            <Route path="/trash" element={<MobTrashPage />} />
            <Route path="sample/:id" element={<MobSamplePageWrapper />} />
            <Route path="view/:id?" element={<MobViewPage />} />
          </Route>
        </>
      ) : (
        <>
        </>
        // <>
        //   <Route path="/" element={<MainLayout />}>
        //     <Route index element={<DashboardPage />} />
        //     <Route path="/tcList" element={<TcListPage />} />
        //     <Route path="/trash" element={<TrashPage />} />
        //   </Route>
        //   <Route path="/trash/:tcSeq" element={<TrashDetailPage />} />
        //   <Route path="/tcEdit/:tcSeq" element={<TcEditPage />} />
        //   <Route path="/share/tc/:tcSeq" element={<TcSharePage />} />
        // </>
      )}
      {/* 임시 추가 */}
      <Route path="/loading" element={<Loading />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
